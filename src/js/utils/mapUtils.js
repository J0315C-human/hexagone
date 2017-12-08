import glob from '../globals';

const _randomBufferRatio = 0.4;
const _randomFillRatio = 0.4;

export const sortMapByPosition = (mapDef) => {
	const sorted = [];

	for (let i = 0; i < glob.n_rows; i++) {
		for (let j = 0; j < glob.n_cols; j++) {
			mapDef.forEach(h => {
				if (h.i === i && h.j === j)
					sorted.push(h);
			});
		}
	}
	return sorted;
};


// generate random arrow direction (or two)
const _getArrowDirs = () => {
	const qty = Math.random() > 0.85? 2 : 1;
	const dirs = [];
	while (dirs.length < qty){
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
			delay: Math.floor(Math.random() * interval),
		},
	};
	if (Math.random() < bufferRatio) {
		hex.type = 'buffer';
		hex.timing.delay = hex.timing.delay + 1;
		hex.dir = _getArrowDirs();
	} else {
		hex.timing.interval = interval;
	}
	return hex;
};

export const randomMap = (fillRatio = _randomFillRatio, bufferRatio = _randomBufferRatio) => {
	const rMap = [];
	glob.hexspace.forEach((n, i) => {
		n.forEach((m, j) => {
			if (Math.random() > fillRatio) return;
			
			rMap.push(getRandomHexDef(i, j, bufferRatio));
		});
	});
	return rMap;
};