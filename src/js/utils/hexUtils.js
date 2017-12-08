import { drawHex } from './drawUtils';
import glob from '../globals';

let _nextId = 0;
const _getId = () => (_nextId++).toString(16);

// create an object of Hex properties (used to create Hexes)
export const createHexParams = (h) => {
	const { hex_h, hex_w, hex_x_offset, hex_y_offset, first_dir } = glob;
	const offsetMod = first_dir === 'left' ? 0 : 1;

	const x = h.i % 2 === offsetMod ?
		(h.j + 0.5) * hex_w + hex_x_offset
		: h.j * hex_w + hex_x_offset;
	const y = h.i * hex_h + hex_y_offset;
	const classname = h.type ? `hex-${h.type}` : 'hex';
	const id = `hex-${_getId()}`;

	const svgParams = {};
	if (h.dir !== undefined)
		svgParams.arrow = h.dir;
	if (h.type === 'buffer')
		svgParams.dots = h.timing.delay;
	else
		svgParams.dots = h.timing.interval;

	const elements = drawHex(id, classname, svgParams);
	elements.parent.style.zIndex = glob.layers.main;
	const params = {
		type: h.type,
		id,
		pos: {
			x: x, y: y,
		},
		dragPos: {
			x: x, y: y,
		},
		loc: {
			j: h.j,
			i: h.i,
		},
		dead: false,
		neighbors: [],
		timing: h.timing,
		elements: elements,
	};

	params.directions = typeof h.dir === 'object' ?
		h.dir : [h.dir];
	return params;
};


// set events to keep track of which hex is being interacted with
const setMouseEventsAll = (hexes, data) => {
	hexes.forEach((h, n) => {
		updateMouseEvents(h, data, n);
	});
};

const _selectHex = (hex, data, index) => {
	if (data.curHexIdx === null && !hex.dead) {
		data.curHexIdx = index;
	}
};

const _deselectHex = (hex, data, index) => {
	if (!data.isDragging & data.curHexIdx === index) {
		data.curHexIdx = null;
		data.dragStart = null;
	}
};

const updateMouseEvents = (hex, data, index) => {

	hex.elements.el.onmouseenter = () => _selectHex(hex, data, index);
	hex.elements.el.ontouchstart = () => _selectHex(hex, data, index);

	hex.elements.el.onmouseleave = () => _deselectHex(hex, data, index);
	hex.elements.el.ontouchend = () => _deselectHex(hex, data, index);
};

export default {
	setMouseEventsAll,
	updateMouseEvents,
};
