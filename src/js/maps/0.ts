import { MapDef } from '../types/game';


const map: MapDef = {
  winType: 'all',
  hexes: [
    { i: 0, j: 1, timing: { delay: 1 }, type: 'buffer', dir: [4] },
    { i: 0, j: 2, timing: { delay: 1 }, type: 'buffer', dir: [3, 5] },
    { i: 0, j: 3, timing: { delay: 1 }, type: 'buffer', dir: [5] },
    { i: 0, j: 4, timing: { delay: 1 }, type: 'buffer', dir: [5] },
    { i: 1, j: 1, timing: { delay: 1 }, type: 'buffer', dir: [4] },
    { i: 1, j: 3, timing: { delay: 2 }, type: 'buffer', dir: [3] },
    { i: 1, j: 5, timing: { delay: 1 }, type: 'buffer', dir: [0] },
    { i: 2, j: 0, timing: { delay: 1 }, type: 'buffer', dir: [4] },
    { i: 2, j: 3, timing: { delay: 3 }, type: 'buffer', dir: [4] },
    { i: 2, j: 5, timing: { delay: 1 }, type: 'buffer', dir: [0] },
    { i: 3, j: 0, timing: { delay: 1 }, type: 'buffer', dir: [3] },
    { i: 3, j: 2, timing: { delay: 3 }, type: 'buffer', dir: [2] },
    { i: 3, j: 3, timing: { interval: 3, delay: 1 } },
    { i: 3, j: 6, timing: { delay: 1 }, type: 'buffer', dir: [0] },
    { i: 4, j: 0, timing: { delay: 1 }, type: 'buffer', dir: [3] },
    { i: 4, j: 1, timing: { delay: 2 }, type: 'buffer', dir: [1] },
    { i: 4, j: 3, timing: { delay: 3 }, type: 'buffer', dir: [0] },
    { i: 4, j: 4, timing: { delay: 2 }, type: 'buffer', dir: [5] },
    { i: 4, j: 5, timing: { delay: 1 }, type: 'buffer', dir: [5, 1] },
    { i: 5, j: 1, timing: { delay: 1 }, type: 'buffer', dir: [1, 3] },
    { i: 5, j: 5, timing: { delay: 1 }, type: 'buffer', dir: [1] },
    { i: 4, j: 2, timing: { delay: 5 }, type: 'buffer', dir: [1] },
    { i: 6, j: 1, timing: { delay: 1 }, type: 'buffer', dir: [2] },
    { i: 6, j: 2, timing: { delay: 1 }, type: 'buffer', dir: [2] },
    { i: 6, j: 3, timing: { delay: 1 }, type: 'buffer', dir: [2] },
    { i: 6, j: 4, timing: { delay: 1 }, type: 'buffer', dir: [1] },
    { i: 2, j: 2, timing: { delay: 5 }, type: 'buffer', dir: [3] },
    { i: 3, j: 4, timing: { delay: 5 }, type: 'buffer', dir: [5] },
  ]
};

export default map;