import { Tune } from '../types/tune';

const tune0: Tune = {
  scale: ['Bb4', 'G4', 'D4', 'C5', 'F4', 'A4',
    'Eb4', 'C5', 'D5', 'Eb5', 'F5'],
  changes: [
    {
      notes: ['Eb3', 'C4'],
      beats: 12
    },
    {
      notes: ['F3', 'D4'],
      beats: 12
    },
  ]
};

const tune1: Tune = {
  scale: ['D4', 'C5', 'F4', 'Bb4', 'G4', 'A4',
    'Eb4', 'C5', 'D5', 'Eb5', 'F5'],
  changes: [
    {
      notes: ['Eb3', 'Bb3'],
      beats: 12
    },
    {
      notes: ['F3', 'C4'],
      beats: 12
    },
  ]
};

const tune2: Tune = {
  scale: ['C4', 'F4', 'C5', 'Bb4', 'D4', 'G4',
    'Eb4', 'A4', 'D5', 'Eb5', 'F5', 'G5'],
  changes: [
    {
      notes: ['Eb3', 'Bb3'],
      beats: 8
    },
    {
      notes: ['F3', 'C4'],
      beats: 8
    },
    {
      notes: ['D3', 'A3'],
      beats: 8
    },
    {
      notes: ['Eb3', 'Bb3', 'D4'],
      beats: 8
    },
  ]
};

const tune3: Tune = {
  scale: ['C4', 'F4', 'C5', 'Bb4', 'D4', 'G4',
    'Eb4', 'A4', 'D5', 'Eb5', 'F5', 'G5'],
  changes: [
    {
      notes: ['Eb3', 'Bb3', 'C4'],
      beats: 8
    },
    {
      notes: ['F3', 'C4', 'Eb4'],
      beats: 4
    },
    {
      notes: ['F3', 'C4', 'D4'],
      beats: 4
    },
    {
      notes: ['D3', 'A3', 'C4'],
      beats: 8
    },
    {
      notes: ['Eb3', 'Bb3', 'D4'],
      beats: 8
    },
  ]
};

const tune4: Tune = {
  scale: ['C4', 'D4', 'A4', 'Bb4', 'Eb4', 'F4',
    'G4', 'C5', 'D5', 'Eb5', 'F5', 'G5'],
  changes: [
    {
      notes: ['D3', 'Bb3', 'F4'],
      beats: 16
    },
    {
      notes: ['Eb3', 'Bb3', 'G4'],
      beats: 8
    },
    {
      notes: ['Eb3', 'C4', 'G4'],
      beats: 8
    },
  ]
};

const tune5: Tune = {
  scale: ['C4', 'D4', 'G4', 'Bb4', 'Eb4', 'F4',
    'A4', 'C5', 'D5', 'Eb5', 'F5', 'G5'],
  changes: [
    {
      notes: ['D3', 'Bb3', 'F4'],
      beats: 8
    },
    {
      notes: ['Eb3', 'Bb3', 'G4'],
      beats: 8
    },
    {
      notes: ['Eb3', 'C4', 'G4'],
      beats: 8
    },
    {
      notes: ['F3', 'C4', 'A4'],
      beats: 8
    },
  ]
};

// MEDIUM levels start here
const tune6: Tune = {
  scale: ['C4', 'D4', 'G4', 'A4', 'C5',
    'E4', 'F4', 'Bb4', 'D5', 'E5', 'F5', 'G5'],
  changes: [
    {
      notes: ['C3', 'G3', 'E4'],
      beats: 3
    },
    {
      notes: ['D3', 'A3', 'F4'],
      beats: 3
    },
    {
      notes: ['Eb3', 'Bb3', 'G4'],
      beats: 3
    },
    {
      notes: ['D3', 'A3', 'F4'],
      beats: 3
    },
    {
      notes: ['C3', 'G3', 'E4'],
      beats: 6
    },
    {
      notes: ['D3', 'Bb3', 'G4'],
      beats: 6
    },
  ]
};


export default [
  tune0,
  tune1, tune2, tune3, tune4, tune5, tune6,
] as Tune[];