import { isNeighbor } from '../utils/positionUtils';
import autoBind from '../utils/autobind';
import glob from '../globals';
import { Target } from './target';

// Class to represent a 2d collection of Targets (board locations)
// initializes based on global board size parameters
export class Targets {
	constructor() {
		autoBind(this);
		
		//create all the target hexes
		this.targets = [];
		for (let i = 0; i < glob.n_rows; i++) {
			const targetRow = [];
			for (let j = 0; j < glob.n_cols; j++) {
				targetRow.push(new Target(i, j));
			}
			this.targets.push(targetRow);
		}

		// set all target's neighbor targets.
		const targetsList = this.targets.reduce((prev, cur) => prev.concat(cur), []);
		for (const t1 of targetsList) {
			for (const t2 of targetsList) {
				if (isNeighbor(t1.loc, t2.loc))
					t1.neighborTargets.push(t2);
			}
		}
	}
	// wire up the target-hex relationships
	initializeHexes(hexCollection) {
		this.forEach(t => {
			t.occupied = false;
			t.hex = undefined;

			// array.some is like forEach but stops iterating after a truthy value is returned
			hexCollection.hexes.some(t.linkHexIfOccupies);
		});
		// set each target's neighborHexes
		this.forEach(t => t.initializeNeighborHexes());
	}

	get(i, j) {
		if (this.targets[i] && this.targets[i][j])
			return this.targets[i][j];
		else
			return undefined;
	}

	forEach(callback) {
		for (const row of this.targets)
			for (const target of row) {
				callback(target);
			}
	}

	// get a random unoccupied location
	getRandomUnoccupied() {
		const spots = [];
		this.forEach(t => {
			if (!t.occupied)
				spots.push(t.loc);
		});
		if (spots.length === 0) return false;
		return spots[Math.floor(Math.random() * spots.length)];
	}
}