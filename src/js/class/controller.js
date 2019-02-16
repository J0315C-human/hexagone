import glob from '../globals';
import animate from '../animations';
import maps from '../maps';
import { Scheduler } from './scheduler';
import autoBind from '../utils/autobind';
import { Interface } from './interface';

const _checkWinInterval = 500;

export class Controller {
	constructor(game) {
		this.game = game;
		this.scheduler = new Scheduler(game);
		this.interface = new Interface(this);
		this.buttons = {
			play: document.getElementById('play'),
			next: document.getElementById('prev'),
			next: document.getElementById('next'),
			log: document.getElementById('log'),
		};

		this.buttons.play.style.visibility = 'hidden';
		setTimeout(() => {
			this.buttons.play.style.visibility = 'visible';
		}, 3000);
		autoBind(this);
		this.setEventListeners();
		this.demoRunning = false;
		this.checkWinTimeout = null;
		this.interface.setStart();

	}

	// check if stage is cleared and put up 'you win' menu
	checkWin() {
		const winType = glob.gameMode === 'arcade' ? 'all' : undefined;
		if (!glob.paused && !this.demoRunning && this.game.checkWin(winType)) {
			setTimeout(() => {
				this.interface.setWin();
				this.togglePlayPause();
			}, 1000);
			clearTimeout(this.checkWinTimeout);
		}
		else {
			this.checkWinTimeout = setTimeout(this.checkWin, _checkWinInterval);
		}
	}

	togglePlayPause() {
		if (glob.paused) {
			this.play();
		}
		else {
			if (this.demoRunning)
				this.play();
			else {
				// don't show the interface if buildmode is on
				this.pause(true, !glob.buildmode);
			}
		}
	}

	startDemo() {
		this.play(true);
		this.demoRunning = true;
	}

	showStartInterface() {
		animate.interfaceIn();
		this.interface.hidePlayBtn();
	}

	play(withInterface = false) {
		if (this.game.isLoading()) return;
		if (withInterface) {
			animate.interfaceIn();
			this.interface.hidePlayBtn();
		}
		else {
			this.demoRunning = false;
			animate.interfaceOut();
			this.interface.showPlaybtn();
			this.buttons.play.textContent = 'pause';
			this.checkWinTimeout = this.checkWin();
		}
		glob.paused = false;
		animate.resumeAll();
		this.scheduler.play();
	}

	pause(pauseAnimations = true, showInterface = false) {
		clearTimeout(this.checkWinTimeout);
		glob.paused = true;
		if (pauseAnimations)
			animate.pauseAll();
		if (glob.buildmode)
			this.buttons.play.textContent = 'play';
		if (showInterface) {
			this.interface.hidePlayBtn();
			animate.interfaceIn();
		}
		this.scheduler.pause();
		// console.dir(this.game.board.hexes.hexes.filter(h => !h.dead));
	}

	// index of -1: load random map, index of undefined: reload the same
	load(index, setText = true) {
		if (this.game.isLoading()) return;

		this.game.load(index, this.buttons.play);
		this.pause(false);
		animate.resumeAll();

		if (setText)
			this.interface.setMap();
		this.scheduler.reset();
	}

	prevMap() {
		const { mapIndex } = this.game;
		const newIdx = mapIndex ? mapIndex - 1 : maps.length - 1;
		this.load(newIdx);
	}

	nextMap() {
		const newIdx = (this.game.mapIndex + 1) % maps.length;
		this.load(newIdx);
	}

	reloadSameMap() {
		this.load(undefined, false);
	}

	retry() {
		this.reloadSameMap();
		animate.interfaceOut();
		this.interface.showPlaybtn();
		setTimeout(this.togglePlayPause, 2000);
	}

	setEventListeners() {
		const { play, next, log } = this.buttons;

		play.addEventListener('click', () => {
			if (glob.buildmode || !glob.paused
				|| !glob.interfaceVisible)
				this.togglePlayPause();
		});
		prev.addEventListener('click', this.prevMap);
		next.addEventListener('click', this.nextMap);
		log.addEventListener('click', () => {
			this.game.log();
		});
	}
}