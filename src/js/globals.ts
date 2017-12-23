import { HexCoordinateSpace } from './types/game';

const glob = {
  // debug mode - clicking hexes prints out their info
  debug: false,
  buildmode: false,
  gameMode: 'puzzle',
  n_rows: 7, // i or y
  n_cols: 7, // j or x
  first_dir: 'left', // which direction the second row is offset from the first
  hex_w: 155,	// main hex dimensions
  hex_h: 135,
  scale: 0.5, // scale the whole thing
  animationScale: 1,
  area_w_offset: 10,
  area_h_offset: -5,
  hex_x_offset: 28,  // draw offsets
  hex_y_offset: 27,
  target_x_offset: 20,
  target_y_offset: 20,
  nearest_x_offset: 0,  // offsets for finding nearest hex
  nearest_y_offset: 0,
  elements: {
    container: document.getElementById('container'),
    game: document.getElementById('game'),
    board: document.getElementById('board'),
    interface: document.getElementById('interface'),
  },
  hexspace: [],
  bg_w: 0,	// bg container vars (they are set below)
  bg_h: 0,
  bg_left: 0,
  bg_top: 0,
  beat_ms: 500, // duration of each beat
  preschedule_ms: 100, // how far ahead events are scheduled
  // (worse percieved responsiveness for better animation and audio performance)
  paused: true,
  interfaceVisible: false,
  secretButtonsVisible: false,
  layers: {
    'interaction': '5',
    'focus': '4',
    'main': '3',
    'dead': '2',
    'background': '1',
    'backstage': '0',
  }
};
// generate the 'hex space' for the game board.
// used for positioning and neighbor relationships.
const get_hex_space = (): HexCoordinateSpace => {
  const space = [];
  let offsetJ = 0;
  const remainder = glob.first_dir === 'left' ? 0 : 1;
  for (let i = 0; i < glob.n_rows; i++) {
    const row = [];
    for (let j = 0; j < glob.n_cols; j++) {
      row.push({
        i: i,
        j: j + offsetJ
      });
    }
    if (i % 2 === remainder)
      offsetJ--;
    space.push(row);
  }
  return space;
};

const set_bg_offsets = () => {
  glob.bg_left = glob.elements.board.offsetLeft;
  glob.bg_top = glob.elements.board.offsetTop;
};

glob.hexspace = get_hex_space();

// set bg offsets and recalc on viewport resize
set_bg_offsets();
window.addEventListener('resize', set_bg_offsets);
glob.elements.game.style.visibility = 'visible';

// set bg dimensions
glob.bg_w = glob.hex_w * (glob.n_cols + 0.5) + glob.area_w_offset; // background dimensions
glob.bg_h = glob.hex_h * (glob.n_rows + 0.5) + glob.area_h_offset;
// set bg scale factor
glob.elements.game.style.transform = `scale(${glob.scale})`;
glob.elements.container.style.height = `${(glob.bg_h + 64) * glob.scale}px`;
glob.elements.container.style.width = `${(glob.bg_w) * glob.scale}px`;

// set background element style
glob.elements.board.style.width = `${glob.bg_w}px`;
glob.elements.board.style.height = `${glob.bg_h}px`;
glob.elements.board.style.zIndex = glob.layers.background;

export default glob;