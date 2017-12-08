const medium1 = [
	{ i: 3, j: 1, timing: { interval: 7, delay: 0 }},
	{ i: 1, j: 3, timing: { interval: 7, delay: 1 }},
	{ i: 2, j: 5, timing: { interval: 7, delay: 2 }},
	{ i: 3, j: 3, timing: { delay: 3 }, type: 'buffer', dir: [4] },
	{ i: 3, j: 4, timing: { delay: 3 }, type: 'buffer', dir: [5] },
	{ i: 4, j: 2, timing: { delay: 3 }, type: 'buffer', dir: [3] },
	{ i: 4, j: 4, timing: { delay: 3 }, type: 'buffer', dir: [0] },
	{ i: 5, j: 3, timing: { delay: 3 }, type: 'buffer', dir: [2] },
	{ i: 5, j: 4, timing: { delay: 3 }, type: 'buffer', dir: [1] },
];
const medium2 = [
	{ i: 2, j: 3, timing: { interval: 6, delay: 2 }},
	{ i: 0, j: 1, timing: { interval: 2, delay: 2 }},
	{ i: 4, j: 5, timing: { interval: 3, delay: 2 }},
	{ i: 6, j: 5, timing: { interval: 3, delay: 1 }},
];
const medium3 = [
	{ i: 2, j: 3, timing: { interval: 6, delay: 2 }},
	{ i: 0, j: 1, timing: { interval: 2, delay: 2 }},
	{ i: 4, j: 5, timing: { interval: 3, delay: 2 }},
	{ i: 6, j: 5, timing: { interval: 3, delay: 1 }},
];

const medium4 = [
	{ i: 2, j: 3, timing: { interval: 6, delay: 2 }},
	{ i: 0, j: 1, timing: { interval: 2, delay: 2 }},
	{ i: 4, j: 5, timing: { interval: 3, delay: 2 }},
	{ i: 6, j: 5, timing: { interval: 3, delay: 1 }},
];

const medium5 = [
	{ i: 2, j: 3, timing: { interval: 6, delay: 2 }},
	{ i: 0, j: 1, timing: { interval: 2, delay: 2 }},
	{ i: 4, j: 5, timing: { interval: 3, delay: 2 }},
	{ i: 6, j: 5, timing: { interval: 3, delay: 1 }},
];
const medium6 = [
	{ i: 2, j: 3, timing: { interval: 6, delay: 2 }},
	{ i: 0, j: 1, timing: { interval: 2, delay: 2 }},
	{ i: 4, j: 5, timing: { interval: 3, delay: 2 }},
	{ i: 6, j: 5, timing: { interval: 3, delay: 1 }},
	{ i: 3, j: 4, timing: { delay: 4 }, type: 'buffer', dir: [3] },
];

const medium7 = [
	{ i: 2, j: 3, timing: { interval: 6, delay: 2 }},
	{ i: 0, j: 1, timing: { interval: 2, delay: 2 }},
	{ i: 4, j: 5, timing: { interval: 3, delay: 2 }},
	{ i: 6, j: 5, timing: { interval: 3, delay: 1 }},
	{ i: 3, j: 4, timing: { delay: 4 }, type: 'buffer', dir: [3] },
];

const medium8 = [
	{ i: 2, j: 3, timing: { interval: 6, delay: 2 }},
	{ i: 0, j: 1, timing: { interval: 2, delay: 2 }},
	{ i: 4, j: 5, timing: { interval: 3, delay: 2 }},
	{ i: 6, j: 5, timing: { interval: 3, delay: 1 }},
	{ i: 3, j: 4, timing: { delay: 4 }, type: 'buffer', dir: [3] },
];


export default [medium1, medium2, medium3, medium4, medium5, medium6, medium7, medium8 ];