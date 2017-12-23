import autoBind from '../utils/autobind';
import maps from '../maps';
import animate from '../animations';
import glob from '../globals';

export class Interface {
	constructor(controller) {
		this.elements = {
			title: document.getElementById('interface-title'),
			message: document.getElementById('interface-msg'),
			buttons: document.getElementById('interface-btns'),
		};
		autoBind(this);
		this.interfaceFunctionInProgress = false;

		this.ctrl = controller;
	}

	addButton(text, func) {

		const btn = document.createElement('div');
		btn.className = 'interface-btn';
		btn.textContent = text;
		btn.onclick = () => {
			if (this.interfaceFunctionInProgress) return;
			this.blockEvents(1000);
			func();
		};
		this.elements.buttons.appendChild(btn);
	}

	blockEvents(duration) {
		this.interfaceFunctionInProgress = true;
		setTimeout(() => {
			this.interfaceFunctionInProgress = false;
		}, duration);
	}

	setArcadeModeText() {
		this.elements.title.textContent = 'arcade mode!';
		this.elements.message.textContent = 'don\'t let the board fill up.';
	}

	setMapText(mapIndex) {
		const { title, message } = maps[mapIndex];
		this.elements.title.textContent = title;
		this.elements.message.textContent = message;
	}

	setStart() {
		if (glob.gameMode === 'start') return;

		this.addButton('start game', () => {
			this.ctrl.load(1);
		});
		this.addSwitchModeButton();
		glob.gameMode = 'start';
	}

	setPause() {
		const modeIsarcade = glob.gameMode === 'arcade';
		this.clearButtons();
		this.addButton('continue', this.ctrl.togglePlayPause);

		if (modeIsarcade)
			this.addButton('restart', () => {
				this.ctrl.load(-1, false);
				animate.interfaceOut();
				setTimeout(this.ctrl.togglePlayPause, 2000);
			});
		else
			this.addButton('retry', () => {
				this.ctrl.load(undefined, false);
				animate.interfaceOut();
				setTimeout(this.ctrl.togglePlayPause, 2000);
			});

		this.addSwitchModeButton();
	}

	setWin() {
		const modeIsarcade = glob.gameMode === 'arcade';
		this.clearButtons();
		const btn1Txt = modeIsarcade ? 'load new' : 'load next';
		this.addButton(btn1Txt, () => {
			if (modeIsarcade) {
				this.ctrl.load(-1, false);
				animate.interfaceOut();
				setTimeout(() => {
					this.setPause();
					this.ctrl.togglePlayPause();
				}, 2000);
			}
			else {
				this.ctrl.nextMap();
				this.setMap();
			}
		});
		this.addButton('retry', this.ctrl.retry);
		this.addSwitchModeButton();
	}

	addSwitchModeButton() {
		if (glob.gameMode === 'arcade') {
			this.addButton('puzzle mode', () => {
				glob.gameMode = 'puzzle';
				this.ctrl.load(1);
			});
		} else {
			this.addButton('arcade mode', () => {
				this.ctrl.load(-1);
				glob.gameMode = 'arcade';
				this.setArcadeModeText();
			});
		}
	}

	setMap() {
		this.setMapText(this.ctrl.game.mapIndex);
		this.clearButtons();
		this.addButton('begin', () => {
			animate.interfaceOut();
			setTimeout(this.setPause, 1000);
			setTimeout(this.ctrl.togglePlayPause, 500);
		});
	}

	clearButtons() {
		this.elements.buttons.innerHTML = '';
	}

}