import autoBind from '../utils/autobind';
import glob from '../globals';
import { drawHexTarget } from '../utils/drawUtils';

// a Target is a single 'spot' a hex can be placed
export class Target {
	constructor(i, j) {
		autoBind(this);
		
		const {
			hex_h, hex_w,
			target_x_offset, target_y_offset,
			first_dir } = glob;

		// set location coordinates
		this.loc = { j, i };
		// check if this target's row is shifted right (every other row is shifted)
		const isOffset = i % 2 === (first_dir === 'left' ? 0 : 1);
		// get position coordinates
		this.pos = {
			x: isOffset ?
				(j + 0.5) * hex_w + target_x_offset
				: j * hex_w + target_x_offset,
			y: i * hex_h + target_y_offset
		};

		this.id = `${j}-${i}`;

		// create and position svg elements
		this.elements = drawHexTarget(this.id, this.pos.x, this.pos.y);
		this.elements.parent.style.zIndex = glob.layers.background;

		// bookkeeping for related targets/hexes
		this.hex = undefined;
		this.occupied = false,
		this.neighborTargets = [];
		this.neighborHexes = [];

	}

	// set neighborHexes array based on what's occupying its neighborTargets.
	initializeNeighborHexes() {
		const neighborHexes = [];
		this.neighborTargets.forEach(t => {
			if (t.hex)
				neighborHexes.push(t.hex);
		});
		this.neighborHexes = neighborHexes;
	}

	// update relationships when a hex is placed on this target
	placeHex(hex, updateNeighbors = true) {
		this.hex = hex;
		this.occupied = true;

		if (updateNeighbors)
			this.neighborTargets.forEach(t => t.neighborHexes.push(hex));
	}

	// update relationships if a hex is removed from this target
	removeHex() {
		const hexRemoved = this.hex;
		if (!hexRemoved) return;

		this.neighborTargets.forEach(t => {
			t.neighborHexes = t.neighborHexes.filter(h => h !== hexRemoved);
		});
		this.hex = undefined;
		this.occupied = false;
	}

	// link target with a hex if it is in the same location
	linkHexIfOccupies(h) {
		if (!h.dead && h.loc && (this.loc.j === h.loc.j) && (this.loc.i === h.loc.i)) {
			this.placeHex(h, false);
			h.setTarget(this);
			return true;
		}
		return false;
	}
}

