import glob from '../globals';
import animate from '../animations';
import autoBind from '../utils/autobind';
import { getRandomHexDef } from '../utils/mapUtils';
import { Hex } from './hex';
import { Hexes } from './hexes';
import { Targets } from './targets';
import { handleBuildKey } from '../utils/buildUtils';

const _capacity = glob.n_rows * glob.n_cols;

export class Board {
	constructor(hexDefs) {
		this.data = {
			isDragging: false,
			dragStart: null, // position where mouse drag started
			curHexIdx: null, // which hex is being interacted with (or has the cursor over it)
		};

		this.targets = new Targets();
		this.hexes = new Hexes(hexDefs, true, this.data);
		this.targets.initializeHexes(this.hexes);

		this.logHexes = this.hexes.log;
		this.checkWin = () => this.hexes.checkWin();
		this.updateHexes = beat => this.hexes.update(beat);
		this.clearMap = () => this.hexes.clear();

		autoBind(this);

		this.setBoardEvents();

	}

	setBoardEvents() {
		const el = glob.elements.board;
		el.onmouseup = this.releaseHex;
		el.onmousedown = this.onMouseDown;
		el.onmousemove = this.onMouseMove;
		el.onmouseleave = () => {
			this.releaseHex();
			this.data.curHexIdx = null;
		};
		el.ontouchmove = this.onTouchMove;
		el.ontouchstart = this.onTouchStart;
		el.ontouchend = this.releaseHex;
		el.ontouchcancel = this.releaseHex;

		document.body.onkeyup = this.onKeyUp;
	}

	onKeyUp(e) {
		const idx = this.data.curHexIdx;
		if (idx !== null && glob.buildmode === true) {
			handleBuildKey(e, this.hexes.get(idx), this.data, idx);
		}
		if (glob.buildmode && e.shiftKey) {
			switch (e.keyCode) {
				case 78:
					this.addRandomHex();
					break;
				case 68:
					if (idx !== null) {
						this.hexes.get(idx).die();
					}
					break;
			}
		}
	}

	setupMap(hexDefs) {
		this.hexes = new Hexes(hexDefs, true, this.data);
		this.targets.initializeHexes(this.hexes);
		this.data.isDragging = false;
		this.data.dragStart = null;
		this.data.curHexIdx = null;
	}

	isFull() {
		return this.hexes.numLiving >= _capacity;
	}

	addRandomHex() {
		const loc = this.targets.getRandomUnoccupied();
		if (!loc) return;

		// if there are no 'source' hexes left, create one
		const bufferRatio = this.checkWin() ? 0 : undefined;
		const hexDef = getRandomHexDef(loc.i, loc.j, bufferRatio);
		const newHex = new Hex(hexDef);
		const nHexes = this.hexes.length();

		for (let idx = 0; idx <= nHexes; idx++) {
			// push a new hex to the array
			if (idx === nHexes) {
				this.hexes.add(newHex);
				break;
			}
			// reuse a 'dead' hexes' slot if available
			if (this.hexes.get(idx).dead) {
				this.hexes.replace(idx, newHex);
				break;
			}
		}

		const target = this.targets.get(loc.i, loc.j);
		target.placeHex(newHex);
		newHex.setTarget(target);
		animate.setupHex(newHex, ((loc.i + 1) * 0.1));
	}

	// a hex is 'picked up'
	onHexPickup(x, y) {
		let { curHexIdx } = this.data;
		if (curHexIdx !== null && !this.hexes.get(curHexIdx).dead) {
			this.data.isDragging = true;
			this.data.dragStart = { x, y };
			const hex = this.hexes.get(curHexIdx);
			const target = hex.target;
			if (target) {
				target.removeHex();
				hex.removeTarget();
			}
			hex.addRemoveClass('hex-hl');
		}
	}
	// a hex is dragged or moved
	onHexMove(x, y) {
		if (glob.paused && !glob.buildmode) return;
		const d = this.data;
		if (d.isDragging && (d.curHexIdx !== null) && d.dragStart) {
			const xd = x - d.dragStart.x;
			const yd = y - d.dragStart.y;
			this.hexes.get(d.curHexIdx).moveBy(xd, yd);
		}
	}

	releaseHex() {
		const d = this.data;
		if (d.curHexIdx !== null && d.isDragging) {
			const hex = this.hexes.get(d.curHexIdx);
			hex.moveToClosestTarget(this.targets.targets);
			d.isDragging = false;
			d.dragStart = null;
			hex.addRemoveClass('hex-hl', false);
		}
	}

	onMouseDown(e) {
		this.onHexPickup(e.x, e.y);
	}
	onTouchStart(e) {
		const touch = e.touches[0];
		this.onHexPickup(touch.clientX, touch.clientY);
	}
	onMouseMove(e) {
		if (glob.paused && !glob.buildmode) return;
		this.onHexMove(e.x, e.y);
	}
	onTouchMove(e) {
		const touch = e.touches[0];
		this.onHexMove(touch.clientX, touch.clientY);
	}
}
