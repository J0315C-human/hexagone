import glob from '../globals';

// relative positions for neighbors in hex space
export const nbrRelCoords = [
	{ j: 0, i: 1 },
	{ j: -1, i: 1 },
	{ j: -1, i: 0 },
	{ j: 0, i: -1 },
	{ j: 1, i: -1 },
	{ j: 1, i: 0 },
];

// convert a location to 'hex space'
const toHexSpace = (loc) => {
	return glob.hexspace[loc.i][loc.j];
};

// check if hex is neighbor
export const isNeighbor = (loc1, loc2, directions = null) => {
	if (!loc1 || !loc2)
		return false;
	const { i: i1, j: j1 } = toHexSpace(loc1);
	const { i: i2, j: j2 } = toHexSpace(loc2);
	const iD = i1 - i2;
	const jD = j1 - j2;
	let isnbr = false;
	nbrRelCoords.forEach((crd, n) => {
		if (directions && !directions.includes(n)) return;
		if (iD === crd.i && jD === crd.j) {
			isnbr = true;
			return;
		}
	});
	return isnbr;
};

// get the closest target (spot) to a x/y position, including or not including occupied spots.
// targets is an array of target objects
export const getClosestTarget = (x0, y0, targets, mustBeUnoccupied = true) => {
	x0 = x0 + glob.nearest_x_offset;
	y0 = y0 + glob.nearest_y_offset;
	let closest = targets[0];
	let closestDist = Infinity;
	targets.forEach(row => {
		row.forEach(t => {
			if (!mustBeUnoccupied || (mustBeUnoccupied && !t.occupied)) {
				const { x, y } = t.pos;
				const xd = x - x0;
				const yd = y - y0;
				const dist = Math.sqrt(xd * xd + yd * yd);
				if (dist < closestDist) {
					closest = t;
					closestDist = dist;
				}
			}
		});
	});
	return closest;
};