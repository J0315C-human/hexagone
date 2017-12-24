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

	const svgParams = {
		frozen: h.frozen
	};
	if (h.dir !== undefined)
		svgParams.arrow = h.dir;

	switch (h.type) {
		case 'buffer':
			svgParams.dots = h.timing.delay;
			break;
		case 'pattern':
			svgParams.symbol = '?';
			break;
		default:
			svgParams.dots = h.timing.interval;
			break;
	}

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
		note: h.note
	};
	if (h.note)
		params.note = h.note;
	if (h.frozen)
		params.frozen = true;
	if (h.dir !== undefined)
		params.directions = h.dir;
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
		if (!glob.buildmode && hex.frozen) return;
		data.curHexIdx = index;
	}
};

const _deselectHex = (hex, data, index) => {
	if (!data.isDragging & data.curHexIdx === index) {
		if (!glob.buildmode && hex.frozen) return;
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
