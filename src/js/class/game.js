import glob from '../globals';
import maps from '../maps';
import { randomMap } from '../utils/mapUtils';
import { Blooper } from './blooper';
import { Board } from './board';

export class Game {
	constructor() {
		this.board = new Board(maps[0]);
		this.blooper = new Blooper(maps[0].tune);

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
	//returns hex indexes or notes to schedule sounds
	getSoundingHexes() {
		return this.board.hexes.getNewNotes();
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
		}
		else {
			map = maps[index];
			this.mapIndex = index;
		}
		this.map = map;
		this.blooper.loadTune(map.tune);

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
			if (glob.buildmode)
				playButtonElement.textContent = 'play';
		}, enablePlayTimeout);
		glob.score = 0;
		glob.elements.score.textContent = '0';
	}

	log() {
		return this.board.logHexes();
	}
}
