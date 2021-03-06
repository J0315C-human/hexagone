import { MapDef } from '../types/game';
import tunes from '../tunes';

const medium1: MapDef = {
  title: 'medium #1',
  message: 'objective: clear all red blocks (even the frozen ones)',
  winType: 'normals',
  hexes: [
    { i: 2, j: 3, timing: { interval: 5, delay: 1 }, frozen: true },
    { i: 3, j: 3, timing: { delay: 3 }, type: 'buffer', dir: [4] },
    { i: 3, j: 4, timing: { delay: 3 }, type: 'buffer', dir: [5], frozen: true },
    { i: 4, j: 2, timing: { delay: 3 }, type: 'buffer', dir: [3], frozen: true },
    { i: 4, j: 3, timing: { interval: 5, delay: 0 } },
    { i: 4, j: 4, timing: { delay: 3 }, type: 'buffer', dir: [0] },
    { i: 5, j: 2, timing: { interval: 5, delay: 3 }, frozen: true },
    { i: 5, j: 3, timing: { delay: 3 }, type: 'buffer', dir: [2] },
    { i: 5, j: 4, timing: { delay: 3 }, type: 'buffer', dir: [1], frozen: true },
    { i: 5, j: 5, timing: { interval: 5, delay: 2 }, frozen: true },
  ],
  tune: tunes[6]
};

const medium2: MapDef = {
  title: 'medium #2',
  message: 'objective: clear ALL blocks',
  winType: 'all',
  hexes: [
    { i: 2, j: 4, timing: { interval: 6, delay: 1 } },
    { i: 3, j: 1, timing: { interval: 3, delay: 0 } },
    { i: 1, j: 5, timing: { delay: 2 }, type: 'buffer', dir: [4] },
    { i: 2, j: 1, timing: { delay: 3 }, type: 'buffer', dir: [4] },
    { i: 5, j: 2, timing: { delay: 2 }, type: 'buffer', dir: [1] },
    { i: 4, j: 5, timing: { delay: 3 }, type: 'buffer', dir: [1] }
  ],
  tune: tunes[6]
};
const medium3: MapDef = {
  title: 'medium #3',
  message: 'objective: clear all red blocks',
  winType: 'sources',
  hexes: [
    { i: 0, j: 6, timing: { interval: 6, delay: 1 } },
    { i: 1, j: 6, timing: { delay: 2 }, type: 'buffer', dir: [1], frozen: true },
    { i: 2, j: 0, timing: { delay: 3 }, type: 'buffer', dir: [3] },
    { i: 2, j: 3, timing: { interval: 6, delay: 0 } },
    { i: 2, j: 4, timing: { delay: 2 }, type: 'buffer', dir: [5], frozen: true },
    { i: 3, j: 1, timing: { interval: 4, delay: 0 }, frozen: true },
    { i: 3, j: 6, timing: { delay: 2 }, type: 'buffer', dir: [3], frozen: true },
    { i: 4, j: 2, timing: { interval: 4, delay: 1 }, frozen: true },
    { i: 4, j: 3, timing: { delay: 3 }, type: 'buffer', dir: [5] },
    { i: 4, j: 6, timing: { interval: 6, delay: 2 } },
    { i: 5, j: 1, timing: { interval: 4, delay: 2 }, frozen: true },
    { i: 6, j: 0, timing: { delay: 3 }, type: 'buffer', dir: [1] },
  ],
  tune: tunes[6]
};

const medium4: MapDef = {
  title: 'medium #4',
  message: 'objective: clear all red blocks',
  winType: 'sources',
  hexes: [
    { i: 3, j: 2, timing: { interval: 7, delay: 1 }, frozen: true },
    { i: 3, j: 3, timing: { delay: 4 }, type: 'buffer', dir: [5] },
    { i: 3, j: 4, timing: { delay: 4 }, type: 'buffer', dir: [5], frozen: true },
  ],
  tune: tunes[6]
};

const medium5: MapDef = {
  title: 'medium #5',
  message: 'objective: clear all blocks',
  winType: 'all',
  hexes: [
    { i: 1, j: 4, timing: { delay: 3 }, type: 'buffer', dir: [5] },
    { i: 1, j: 2, timing: { interval: 5, delay: 2 }, frozen: true },
    { i: 5, j: 4, timing: { delay: 1 }, type: 'buffer', dir: [5] },
    { i: 3, j: 2, timing: { delay: 4 }, type: 'buffer', dir: [2] },
    { i: 3, j: 4, timing: { interval: 4, delay: 2 }, frozen: true },
    { i: 5, j: 2, timing: { interval: 3, delay: 0 }, frozen: true },
  ],
  tune: tunes[6]
};

// this one should have the first 'mystery' block
const medium6: MapDef = {
  title: 'medium #6',
  message: 'objective: clear all blocks',
  winType: 'sources',
  hexes: [
    { i: 3, j: 1, timing: { pattern: 'x..xx.' }, type: 'pattern' },
    { i: 2, j: 4, timing: { pattern: '...x.x' }, type: 'pattern' },
    { i: 4, j: 2, timing: { interval: 3, delay: 0 } },
    { i: 3, j: 6, timing: { interval: 6, delay: 4 } }
  ],
  tune: tunes[6]
};

const medium7: MapDef = {
  title: 'medium #7',
  message: '...this isn\'t a real level yet...',
  winType: 'all',
  hexes: [
    { i: 3, j: 4, timing: { delay: 2 }, type: 'buffer', dir: [5], note: 'C4' },
    { i: 5, j: 3, timing: { pattern: '.....xxx' }, type: 'pattern', note: 'D4' },
    { i: 3, j: 2, timing: { delay: 3 }, type: 'buffer', dir: [0] },
    { i: 2, j: 1, timing: { delay: 4, interval: 5 } },
    { i: 0, j: 3, timing: { pattern: '.....x' }, type: 'pattern', frozen: true }
  ],
  tune: tunes[6]
};

const medium8: MapDef = {
  title: 'medium #8',
  message: '...this isn\'t a real level yet...',
  winType: 'normals',
  hexes: [
    { i: 1, j: 2, timing: { delay: 2, interval: 6 }, frozen: true, note: 'C4' },
    { i: 1, j: 5, timing: { delay: 4, interval: 5 }, frozen: true, note: 'D4' },
    { i: 2, j: 0, timing: { delay: 0, interval: 6 }, frozen: true, note: 'G4' },
    { i: 2, j: 2, timing: { delay: 2 }, type: 'buffer', frozen: true, dir: [4], note: 'A4' },
    { i: 2, j: 4, timing: { delay: 2 }, type: 'buffer', frozen: true, dir: [3], note: 'D4' },
    { i: 2, j: 6, timing: { delay: 1, interval: 5 }, frozen: true, note: 'E4' },
    { i: 3, j: 1, timing: { delay: 2 }, type: 'buffer', frozen: true, dir: [2], note: 'F4' },
    { i: 3, j: 2, timing: { delay: 2 }, type: 'buffer', frozen: true, dir: [3], note: 'G4' },
    { i: 3, j: 5, timing: { delay: 2 }, type: 'buffer', frozen: true, dir: [4], note: 'D5' },
    { i: 3, j: 6, timing: { delay: 2 }, type: 'buffer', frozen: true, dir: [5], note: 'E5' },
    { i: 4, j: 2, timing: { delay: 2 }, type: 'buffer', frozen: true, dir: [3], note: 'F5' },
    { i: 4, j: 4, timing: { delay: 2 }, type: 'buffer', frozen: true, dir: [4], note: 'G5' },
    { i: 5, j: 0, timing: { pattern: 'x.x...' }, type: 'pattern', note: 'C4' },
    { i: 5, j: 4, timing: { delay: 2 }, type: 'buffer', frozen: true, dir: [5], note: 'D4' },
    { i: 6, j: 1, timing: { pattern: '...xx.' }, type: 'pattern', note: 'G4' },
    { i: 6, j: 6, timing: { pattern: '.x..x.' }, type: 'pattern', note: 'C4' },
    { i: 2, j: 1, timing: { delay: 1 }, type: 'buffer', frozen: true, dir: [] },
    { i: 2, j: 5, timing: { delay: 1 }, type: 'buffer', frozen: true, dir: [] },
    { i: 1, j: 6, timing: { delay: 1 }, type: 'buffer', frozen: true, dir: [] },
    { i: 0, j: 5, timing: { delay: 1 }, type: 'buffer', frozen: true, dir: [] },
    { i: 0, j: 4, timing: { delay: 1 }, type: 'buffer', frozen: true, dir: [] },
    { i: 1, j: 4, timing: { delay: 1 }, type: 'buffer', frozen: true, dir: [] },
    { i: 3, j: 0, timing: { delay: 1 }, type: 'buffer', frozen: true, dir: [] },
    { i: 1, j: 0, timing: { delay: 1 }, type: 'buffer', frozen: true, dir: [] },
    { i: 1, j: 1, timing: { delay: 1 }, type: 'buffer', frozen: true, dir: [] },
    { i: 0, j: 1, timing: { delay: 1 }, type: 'buffer', frozen: true, dir: [] },
    { i: 0, j: 2, timing: { delay: 1 }, type: 'buffer', frozen: true, dir: [] },
    { i: 1, j: 3, timing: { delay: 1 }, type: 'buffer', frozen: true, dir: [] }
  ],
  tune: tunes[6]
};

export default [
  medium1,
  medium2,
  medium3,
  medium4,
  medium5,
  medium6,
  medium7,
  medium8
] as MapDef[];
