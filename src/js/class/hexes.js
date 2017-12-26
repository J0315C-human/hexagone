import animate from '../animations';
import glob from '../globals';
import { Hex } from './hex';
import hexUtils from '../utils/hexUtils';
import autoBind from '../utils/autobind';
import { timingSafeEqual } from 'crypto';

export class Hexes {
	constructor(mapDef, animateIn = true, boardData) {
		autoBind(this);

		this.boardData = boardData;
		//create Hex objects
		this.hexes = [];
		const scale = mapDef.tune.scale;
		mapDef.hexes.forEach((hexDef, n) => {
			if (hexDef.i < glob.n_rows && hexDef.j < glob.n_cols) {
				hexDef.note = hexDef.note || scale[n % scale.length];
				this.hexes.push(new Hex(hexDef));
			}
		});
		if (animateIn)
			animate.setupHexes(this.hexes);

		this.flashing = [];
		this.dying = [];
		this.flashingNotes = [];
		this.dyingNotes = [];
		this.scoringGroups = undefined;

		this.numLiving = mapDef.hexes.length;
		this.winType = mapDef.winType;
		hexUtils.setMouseEventsAll(this.hexes, this.boardData);
	}

	getNewNotes() {
		return {
			flashing: this.flashing,
			dying: this.dying,
			flashingNotes: this.flashingNotes,
			dyingNote: this.dyingNotes
		}
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

	killHexes(dieIndexes) {
		this.scoreTurn();
		dieIndexes.forEach(n => {
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
		const flashNotes = [];
		const { hexes } = this;

		// figure out which hexes will flash
		hexes.forEach(h => h.updatePre(beatNumber));
		hexes.forEach((h, n) => {
			h.updatePost();
			if (h.flashing) {
				flashers.push(n);
				flashNotes.push(h.note);
			}
		});
		this.flashing = flashers;
		this.flashingNotes = flashNotes;
		// figure out which will die
		const dieIndexes = [];
		const dieNotes = [];
		let g = 1; // counter for groups
		for (let a = 0; a < hexes.length; a++) {
			const h_a = hexes[a];
			const h_a_flash = h_a.flashing;
			if (h_a_flash && !h_a.dead)
				h_a.getNeighbors().forEach((h_b) => {
					const bothFlash = h_a_flash && h_b.flashing;
					if (bothFlash && !h_b.dead) {
						if (h_b.group) {
							h_a.addGroup(h_b.group);
						}
						if (!dieIndexes.includes(a)) {
							dieIndexes.push(a);
							dieNotes.push(h_a.note);
						}
					}
				});
			// if it's dying, consolidate its neighboring groups
			if (dieIndexes.includes(a)) {
				if (h_a.neighborGroups.length === 0) {
					h_a.group = g++; // form new 'death group'
				} else if (h_a.neighborGroups.length === 1) {
					h_a.group = h_a.neighborGroups[0];
				} else {
					const firstGroup = h_a.neighborGroups[0];
					h_a.group = firstGroup;
					this.consolidateDeathGroups(firstGroup, h_a.neighborGroups);
				}
			}
		}
		this.numLiving -= dieIndexes.length;
		this.dying = dieIndexes;
		this.dyingNotes = dieNotes;
		if (dieIndexes.length > 0)
			this.killHexes(dieIndexes);
		animate.flash();
	}
	// take all members of a set of death groups and join them to another group.
	consolidateDeathGroups(groupTo, groupsFrom) {
		const { hexes } = this;
		hexes.forEach(h => {
			if (groupsFrom.includes(h.group)) {
				h.group = groupTo;
			}
		});
	}
	scoreTurn() {
		this.getScoringGroups()
			.forEach(group => {
				const comboSize = group.length - 1;
				group.forEach(hex => {
					glob.score += hex.getPointValue(comboSize);
				})
			})
		glob.elements.score.textContent = glob.score;
	}
	getScoringGroups() {
		const { hexes } = this;
		const groups = [[], [], [], [], [], [], [], [], []];
		this.dying.forEach(idx => {
			const h = this.hexes[idx];
			groups[h.group - 1].push(h);
		})
		return groups;
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
				counts = h => (h.type === 'pattern' || h.type === 'buffer');
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
			return JSON.stringify(h.getHexDef())
				.replace('"i"', 'i')
				.replace('"j"', 'j')
				.replace('"timing"', 'timing')
				.replace('"frozen"', 'frozen')
				.replace('"delay"', 'delay')
				.replace('"dir"', 'dir')
				.replace('"interval"', 'interval')
				.replace('"type"', 'type')
				.replace('"pattern"', 'pattern')
				.replace('"note"', 'note')
				.replace(/"/g, '\'');
		});
		console.log(output.join(',\n'));
	}
}
