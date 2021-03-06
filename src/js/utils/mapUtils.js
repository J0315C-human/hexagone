import glob from '../globals';
import tunes from '../tunes';

const _randomBufferRatio = 0.333;
const _randomFillRatio = 0.35;
const _randomFrozenRatio = 0.333;
const _randomPatternRatio = 0.08;
export const sortMapByPosition = (mapDef) => {
	const sorted = [];

	for (let i = 0; i < glob.n_rows; i++) {
		for (let j = 0; j < glob.n_cols; j++) {
			mapDef.hexes.forEach(h => {
				if (h.i === i && h.j === j)
					sorted.push(h);
			});
		}
	}
	return {
		...mapDef,
		hexes: sorted
	}
};

// tell us what edge this hex is on
const _getEdge = (i, j) => {
	let edge = '';
	if (i === 0)
		edge += 'top';
	else if (i === glob.n_rows - 1)
		edge += 'bottom';
	if (j === 0)
		edge += 'left';
	else if (j === glob.n_cols - 1)
		edge += 'right';
	return edge
}

// generate random arrow direction (or two)
const _getArrowDirs = () => {
	const qty = Math.random() > 0.85 ? 2 : 1;
	const dirs = [];
	while (dirs.length < qty) {
		const dir = Math.floor(Math.random() * 6);
		if (!dirs.includes(dir))
			dirs.push(dir);
	}
	return dirs;
};

export const getRandomHexDef = (i, j, bufferRatio = _randomBufferRatio) => {
	const interval = Math.ceil(Math.random() * 7);
	const hex = {
		i, j,
		timing: {
		},
	};
	if (!_getEdge(i, j) && Math.random() < _randomFrozenRatio)
		hex.frozen = true;
	if (Math.random() < bufferRatio) {
		hex.type = 'buffer';
		hex.timing.delay = Math.floor(Math.random() * 7) + 1;
		hex.dir = _getArrowDirs();
	} else if (Math.random() < _randomPatternRatio) {
		hex.type = 'pattern';
		hex.timing.pattern = getRandomPattern();
	} else {
		hex.timing.delay = Math.floor(Math.random() * interval);
		hex.timing.interval = interval;
	}
	return hex;
};

const getRandomPattern = () => {
	const nBeats = Math.floor(Math.random() * 5) + 3;
	const beatChance = 0.333;
	let pattern = '';
	let i = nBeats;
	while (i) {
		pattern += Math.random() < beatChance ? 'x' : '.';
		i--;
	}
	if (!pattern.includes('x'))
		pattern += 'x';
	else if (!pattern.includes('.'))
		pattern += '.';
	return pattern;
}

const randomHexMap = (fillRatio, bufferRatio) => {
	const rMap = [];
	glob.hexspace.forEach((n, i) => {
		n.forEach((m, j) => {
			if (Math.random() > fillRatio) return;

			rMap.push(getRandomHexDef(i, j, bufferRatio));
		});
	});
	return rMap;
};

export const randomMap = (fillRatio = _randomFillRatio, bufferRatio = _randomBufferRatio) => {

	const tuneIdx = Math.floor(Math.random() * tunes.length);
	return {
		title: 'random Map',
		message: 'this text also shouldn\'t be visible',
		winType: 'all',
		hexes: randomHexMap(fillRatio, bufferRatio),
		tune: tunes[tuneIdx]
	}
}