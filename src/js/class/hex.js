import animate from '../animations';
import glob from '../globals';
import { isNeighbor, getClosestTarget } from '../utils/positionUtils';
import { createHexParams } from '../utils/hexUtils';
import autoBind from '../utils/autobind';


export class Hex {
	constructor(hexDef) {

		const hexObj = createHexParams(hexDef);

		Object.keys(hexObj).forEach(key => {
			this[key] = hexObj[key];
		});

		autoBind(this);

		this.flashing = false;
		this.target = undefined;

		this.createBufferHistory();
	}

	createBufferHistory() {
		if (this.type === 'buffer') {
			this.history = [];
			for (let i = 0; i < this.timing.delay; i++) {
				this.history.push(false);
			}
		}
	}

	setTarget(target) {
		this.target = target;
		this.loc = target.loc;
	}

	removeTarget() {
		this.target = undefined;
		this.loc = null;
	}

	replaceWith(hexDef) {
		hexDef.i = this.loc.i;
		hexDef.j = this.loc.j;
		const newHex = createHexParams(hexDef);
		this.clearElements();
		this.frozen = undefined;
		this.directions = undefined;
		Object.keys(newHex).forEach(key => {
			this[key] = newHex[key];
		});
		// replace with another hex instantly
		animate.setupHex(newHex, 0);
		this.flashing = false;
		this.createBufferHistory();
	}

	//gets neighboring hexes based only on surrounding targets
	getNeighbors() {
		if (!this.target) return [];
		return this.target.neighborHexes;
	}

	isValidNeighbor(other) {
		if (this.dead) return false;
		if (this.type === 'buffer')
			return isNeighbor(this.loc, other.loc, this.directions);
		else
			return true;
	}

	addRemoveClass(classname, add = true) {
		if (this.dead) return;
		if (add) {
			this.elements.el.classList.add(classname);
		} else {
			this.elements.el.classList.remove(classname);
		}
		return this;
	}

	die() {
		this.loc = null;
		this.flashing = false;
		this.elements.parent.style.pointerEvents = 'none';
		this.elements.el.style.pointerEvents = 'none';
		this.elements.parent.style.zIndex = glob.layers.focus;
		animate.killHex(this);
		if (this.target)
			this.target.removeHex();
		this.dead = true;
	}

	clearElements() {
		this.elements.parent.remove();
		this.elements = null;
	}

	// animate to a specific coord position and set our new target
	moveToClosestTarget(targets) {
		const target = getClosestTarget(this.dragPos.x, this.dragPos.y, targets);
		const { elements: { parent }, pos, dragPos } = this;
		const { pos: newPos } = target;
		parent.style.zIndex = glob.layers.main;
		pos.x = newPos.x + glob.hex_x_offset - glob.target_x_offset;
		pos.y = newPos.y + glob.hex_y_offset - glob.target_y_offset;
		animate.fromTo(parent, dragPos.x, dragPos.y, pos.x, pos.y, 0.15);

		// link the hex to the target
		this.setTarget(target);
		target.placeHex(this);
	}

	// move by an x and y amount relative to current pos
	moveBy(xd, yd) {
		const { scale: sf } = glob;
		const { elements: { parent }, pos, dragPos } = this;
		const newx = pos.x + (xd / sf);
		const newy = pos.y + (yd / sf);
		dragPos.x = newx;
		dragPos.y = newy;
		parent.style.zIndex = glob.layers.interaction;
		parent.style.transform = `translate(${newx}px, ${newy}px)`;
	}

	updatePre(beatNumber) {
		if (this.dead) return;
		this.flashing = this.doesFlash(beatNumber);
		this.addRemoveClass('hex-flash', this.flashing);
	}

	updatePost() {
		if (this.dead) return;

		switch (this.type) {
			case 'buffer': {
				let nextHistory = false;
				this.getNeighbors()
					.forEach(nbr => {
						if (nbr.flashing && this.isValidNeighbor(nbr))
							nextHistory = true;
					});
				this.history.push(nextHistory);
				this.history.shift();
				break;
			}
			default:
				return;
		}
	}

	doesFlash(beatNumber) {
		if (this.dead) return false;
		switch (this.type) {
			case 'buffer':
				return this.history[0];
			case 'pattern': {
				const beat = beatNumber % this.timing.pattern.length;
				return this.timing.pattern[beat] === 'x';
			}
			default: {
				return (beatNumber - this.timing.delay) % this.timing.interval === 0;
			}
		}
	}

	// get a basic object representation (for use with hexEditor)
	getHexDef() {
		const hexDef = {
			i: this.loc.i,
			j: this.loc.j,
			timing: {
				...this.timing
			}
		}
		if (this.type)
			hexDef.type = this.type;
		if (this.frozen)
			hexDef.frozen = true;
		if (this.type === 'buffer')
			hexDef.dir = this.directions;
		console.log("hexdef from hex:");
		console.log(hexDef);
		return hexDef;
	}
}