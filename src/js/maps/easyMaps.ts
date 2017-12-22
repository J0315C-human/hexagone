import { MapDef } from '../types/game';
import tunes from '../tunes';


const easy1: MapDef = {
  title: 'easy #1',
  message: 'objective: clear all blocks',
  winType: 'sources',
  hexes: [
    { i: 0, j: 1, timing: { interval: 5, delay: 0 } },
    { i: 1, j: 1, timing: { interval: 3, delay: 1 } },
    { i: 3, j: 3, timing: { interval: 3, delay: 1 } },
    { i: 3, j: 5, timing: { interval: 3, delay: 2 } },
    { i: 5, j: 3, timing: { interval: 3, delay: 2 } },
    { i: 5, j: 5, timing: { interval: 3, delay: 1 } },
  ],
  tune: tunes[1]
};

const easy2: MapDef = {
  title: 'easy #2',
  message: 'objective: clear all blocks',
  winType: 'sources',
  hexes: [
    { i: 1, j: 2, timing: { interval: 3, delay: 0 } },
    { i: 1, j: 4, timing: { interval: 3, delay: 1 } },
    { i: 2, j: 1, timing: { interval: 3, delay: 2 } },
    { i: 2, j: 4, timing: { interval: 3, delay: 2 } },
    { i: 4, j: 2, timing: { interval: 3, delay: 1 } },
    { i: 4, j: 3, timing: { interval: 3, delay: 0 } },
  ],
  tune: tunes[1]
};

const easy3: MapDef = {
  title: 'easy #3',
  message: 'objective: clear all blocks',
  winType: 'sources',
  hexes: [
    { i: 0, j: 1, timing: { interval: 6, delay: 2 } },
    { i: 4, j: 1, timing: { interval: 4, delay: 0 } },
    { i: 2, j: 4, timing: { interval: 2, delay: 1 } },
    { i: 6, j: 4, timing: { interval: 6, delay: 2 } },
    { i: 4, j: 5, timing: { interval: 4, delay: 0 } },
    { i: 2, j: 0, timing: { interval: 2, delay: 1 } },
  ],
  tune: tunes[2]
};

const easy4: MapDef = {
  title: 'easy #4',
  message: 'objective: clear all blocks',
  winType: 'sources',
  hexes: [
    { i: 2, j: 3, timing: { interval: 6, delay: 2 } },
    { i: 3, j: 2, timing: { interval: 5, delay: 4 } },
    { i: 4, j: 3, timing: { interval: 4, delay: 2 } },
  ],
  tune: tunes[3]
};

const easy5: MapDef = {
  title: 'easy #5',
  message: 'objective: clear all blocks',
  winType: 'sources',
  hexes: [
    { i: 1, j: 5, timing: { interval: 5, delay: 4 }},
    { i: 3, j: 5, timing: { interval: 5, delay: 2 }},
    { i: 1, j: 1, timing: { interval: 3, delay: 2 }},
    { i: 5, j: 3, timing: { interval: 3, delay: 1 }},
    { i: 3, j: 1, timing: { interval: 3, delay: 2 }},
    { i: 3, j: 3, timing: { interval: 2, delay: 1 }},
  ],
  tune: tunes[3]
};

const easy6: MapDef = {
  title: 'easy #6',
  message: 'objective: clear all blocks',
  winType: 'sources',
  hexes: [
    { i: 1, j: 3, timing: { interval: 4, delay: 0 } },
    { i: 1, j: 5, timing: { delay: 2 }, type: 'buffer', dir: [5] },
    { i: 4, j: 3, timing: { interval: 4, delay: 2 } },
    { i: 4, j: 1, timing: { interval: 1, delay: 0 } },
  ],
  tune: tunes[4]
};

const easy7: MapDef = {
  title: 'easy #7',
  message: 'objective: clear all RED blocks',
  winType: 'sources',
  hexes: [
    { i: 1, j: 2, timing: { delay: 1 }, type: 'buffer', dir: [3] },
    { i: 2, j: 2, timing: { delay: 1 }, type: 'buffer', dir: [2] },
    { i: 2, j: 3, timing: { delay: 1 }, type: 'buffer', dir: [2] },
    { i: 2, j: 4, timing: { interval: 5, delay: 0 } },
    { i: 4, j: 1, timing: { interval: 5, delay: 3 } },
    { i: 4, j: 4, timing: { interval: 1, delay: 0 } },
  ],
  tune: tunes[4]
};

const easy8: MapDef = {
  title: 'easy #8',
  message: 'objective: clear all red blocks',
  winType: 'sources',
  hexes: [
    { i: 1, j: 3, timing: { delay: 1 }, type: 'buffer', dir: [0] },
    { i: 3, j: 2, timing: { interval: 6, delay: 0 } },
    { i: 2, j: 3, timing: { delay: 1 }, type: 'buffer', dir: [0] },
    { i: 3, j: 4, timing: { delay: 2 }, type: 'buffer', dir: [0] },
    { i: 4, j: 4, timing: { delay: 2 }, type: 'buffer', dir: [0] },
  ],
  tune: tunes[5]
};

export default [easy1, easy2, easy3, easy4, easy5, easy6, easy7, easy8] as MapDef[];