import glob from '../globals';
import maps from '../maps';
import { randomMap } from '../utils/mapUtils';
import { Blooper } from './blooper';
import { Board } from './board';

export class Game {
	constructor() {
		this.board = new Board(maps[0]);
		this.blooper = new Blooper(0);

		this.mapIndex = 0;
		this.map = null;

		this.mapIsLoading = false;
		this.mapIsClearing = false;
	}

	isLoading() {
		return this.mapIsLoading || this.mapIsClearing;
	}

	nextBeat(beatNumber) {
		this.board.updateHexes(beatNumber);
	}

	addRandomHex() {
		this.board.addRandomHex();
	}
	//returns hex index data to schedule sounds
	getSoundingHexes() {
		return {
			flashing: this.board.hexes.flashing,
			dying: this.board.hexes.dying
		};
	}

	checkWin(type) {
		return this.board.checkWin(type);
	}

	clearMap() {
		this.board.clearMap();
	}

	setupMap(map) {
		this.board.setupMap(map);
	}

	load(index, playButtonElement) {
		let map;
		if (index === undefined) {
			map = this.map || randomMap();
		}
		else if (index === -1) {
			map = randomMap();
			this.blooper.loadTune(); // load a random tune
		}
		else {
			map = maps[index];
			this.mapIndex = index;
			this.blooper.loadTune(index);
		}
		this.map = map;

		const loadMapTimeout = 300 * glob.animationScale;
		const enablePlayTimeout = 1400 * glob.animationScale;
		this.mapIsClearing = true;
		this.clearMap();

		playButtonElement.textContent = '...';

		setTimeout(() => {
			this.setupMap(map);
			this.mapIsClearing = false;
			this.mapIsLoading = true;
		}, loadMapTimeout);
		setTimeout(() => {
			this.mapIsLoading = false;
			playButtonElement.textContent = 'play';
		}, enablePlayTimeout);
	}

	log() {
		return this.board.logHexes();
	}
}
