import animate from '../animations';
import glob from '../globals';
import { Hex } from './hex';
import hexUtils from '../utils/hexUtils';
import autoBind from '../utils/autobind';

export class Hexes {
	constructor(mapDef, animateIn = true, boardData) {
		autoBind(this);

		this.boardData = boardData;
		//create Hex objects
		this.hexes = [];
		mapDef.hexes.forEach(hexDef => {
			if (hexDef.i < glob.n_rows && hexDef.j < glob.n_cols)
				this.hexes.push(new Hex(hexDef));
		});
		if (animateIn)
			animate.setupHexes(this.hexes);

		this.flashing = [];
		this.dying = [];

		this.numLiving = mapDef.hexes.length;
		this.winType = mapDef.winType;
		hexUtils.setMouseEventsAll(this.hexes, this.boardData);
	}

	clear() {
		animate.clearHexes(this.hexes);
	}

	length() {
		return this.hexes.length;
	}

	add(newHex) {
		this.hexes.push(newHex);
		this.numLiving += 1;
		hexUtils.updateMouseEvents(newHex, this.boardData, this.hexes.length - 1);
	}

	killHexes(toDie) {
		toDie.forEach(n => {
			this.hexes[n].die();
		});
	}

	forEach(func) {
		this.hexes.forEach(func);
	}

	// update one hexes mouse handlers
	updateMouseEvents(hexIdx) {
		if (hexIdx !== undefined) {
			hexUtils.updateMouseEvents(this.hexes[hexIdx], this.boardData, hexIdx);
		}
	}

	get(idx) {
		return this.hexes[idx];
	}

	replace(idx, newHex) {
		this.hexes[idx] = newHex;
		hexUtils.updateMouseEvents(newHex, this.boardData, idx);
	}

	update(beatNumber) {
		const flashers = [];
		const { hexes } = this;

		// figure out which hexes will flash
		hexes.forEach(h => h.updatePre(beatNumber));
		hexes.forEach((h, n) => {
			h.updatePost();
			if (h.flashing)
				flashers.push(n);
		});
		this.flashing = flashers;
		// figure out which will die
		const toDie = [];
		for (let a = 0; a < hexes.length; a++) {
			const h_a = hexes[a];
			const h_a_flash = h_a.flashing;
			if (h_a_flash && !h_a.dead)
				h_a.getNeighbors().forEach((h_b) => {
					const bothFlash = h_a_flash && h_b.flashing;
					if (bothFlash && !h_b.dead) {
						toDie.push(a);
					}
				});
		}
		this.numLiving -= toDie.length;
		this.killHexes(toDie);
		animate.flash();
		this.dying = toDie;
	}

	checkWin() {
		const { hexes } = this;
		let counts;
		switch (this.winType) {
			case 'all':
				counts = () => true;
				break;
			case 'normals':
				counts = h => !h.type;
				break;
			case 'buffers': 
				counts = h => h.type === 'buffer';
				break;
			case 'patterns':
				counts = h => h.type === 'pattern';
				break;
			case 'buffers+patterns':
				counts = h => (h.type === 'pattern' ||  h.type === 'buffer');
				break;
			case 'unfrozen':
				counts = h => !h.frozen;
				break;
			case 'frozen':
				counts = h => h.frozen;
				break;
			case 'sources':
			default: // only 'sources: normal or patterns'
				counts = h => h.type !== 'buffer';
		}
		// switch (this.winType) {
		// 	case 'all': {
		// 		for (let h of hexes) {
		// 			if (!h.dead)
		// 				return false;
		// 		}
		// 		break;
		// 	}
			// case 'buffers': {
		// 		for (let h of hexes) {
		// 			if (h.type === 'buffer' && !h.dead)
		// 				return false;
		// 		}
		// 		break;
		// 	}
		// 	case 'sources':
		// 	default: { // check if only the source hexes are dead
		// 		for (let h of hexes) {
		// 			if (h.type !== 'buffer' & !h.dead)
		// 				return false;
		// 		}
		// 		break;
		// 	}
		// }
		// check all the hexes, see if all the ones that 'count' are dead
		for (let h of hexes) {
			if (counts(h) && !h.dead)
				return false;
		}
		return true;
	}

	// logging for build mode - produce a pasteable list of hexes
	log() {
		const output = this.hexes.map(h => {
			if (h.dead) return '';
			const frozen = h.frozen? ', frozen: true' : '';
			return h.type === 'buffer' ?
				`{ i: ${h.loc.i}, j: ${h.loc.j}, timing: { delay: ${h.timing.delay} }, type: 'buffer', dir: [${h.directions}]${frozen}},\n`
				:
				`{ i: ${h.loc.i}, j: ${h.loc.j}, timing: { interval: ${h.timing.interval}, delay: ${h.timing.delay} }${frozen}},\n`;
		}
		);
		console.log(output.join(''));
	}
}
