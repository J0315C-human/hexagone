import glob from '../globals';


const _metalGradient = (id) => `<defs>
  <linearGradient x1="36%" y1="100%" x2="64%" y2="0%" id="${id}metal">
   <stop offset="0.15" stop-color="#AAA"/>
   <stop offset="0.3" stop-color="#fff"/>
   <stop offset="0.45" stop-color="#AAA"/>
   <stop offset="0.55" stop-color="#AAA"/>
   <stop offset="0.7" stop-color="#fff"/>
   <stop offset="0.85" stop-color="#AAA"/>
  </linearGradient>
 </defs>`;

const _addOnColor = '#e0e1e6';
const _metalBoltColor = '#888';
const _arrowTransforms = [
	'translate(80, -158) rotate(60)',
	'translate(290, -30) rotate(120)',
	'translate(286, 217) rotate(180)',
	'translate(70, 335) rotate(-120)',
	'translate(-142, 208) rotate(-60)',
	'translate(-137, -38.5)',
];

const _dotSvg = [
	`<circle fill="${_addOnColor}" stroke-width="0" cx="24" cy="23" r="7" stroke="#000"/>`,

	`  <circle r="6" cy="22.30498" cx="14.86999" stroke-width="0" fill="${_addOnColor}" id="svg_2"/>
  <circle r="6" cy="22.30498" cx="31.11991" stroke-width="0" fill="${_addOnColor}" id="svg_3"/>`,

	`<circle fill="${_addOnColor}" stroke-width="0" cx="16.0" cy="27.0" r="6"/>
  <circle fill="${_addOnColor}" stroke-width="0" cx="33.5" cy="27.0" r="6"/>
	<circle fill="${_addOnColor}" stroke-width="0" cx="24.7" cy="12.4" r="6"/>`,

	`  <circle r="6" cy="15.68001" cx="16.24499" stroke-width="0" fill="${_addOnColor}" id="svg_2"/>
  <circle r="6" cy="15.68001" cx="31.74491" stroke-width="0" fill="${_addOnColor}" id="svg_3"/>
  <circle r="6" cy="31.17993" cx="16.24499" stroke-width="0" fill="${_addOnColor}" id="svg_4"/>
  <circle r="6" cy="31.17993" cx="31.74491" stroke-width="0" fill="${_addOnColor}" id="svg_5"/>`,

	`  <circle r="5.4" cy="23.17997" cx="24.24494" stroke-width="0" fill="${_addOnColor}" id="svg_6"/>
  <circle r="5.4" cy="13.18003" cx="34.24489" stroke-width="0" fill="${_addOnColor}" id="svg_7"/>
  <circle r="5.4" cy="13.18003" cx="14.245" stroke-width="0" fill="${_addOnColor}" id="svg_8"/>
  <circle r="5.4" cy="33.17992" cx="34.24489" stroke-width="0" fill="${_addOnColor}" id="svg_9"/>
  <circle r="5.4" cy="33.17992" cx="14.245" stroke-width="0" fill="${_addOnColor}" id="svg_10"/>`,

	`<circle id="svg_7" fill="${_addOnColor}" stroke-width="0" cx="29.99489" cy="10.68003" r="5"/>
  <circle id="svg_8" fill="${_addOnColor}" stroke-width="0" cx="17.495" cy="10.68003" r="5"/>
  <circle id="svg_9" fill="${_addOnColor}" stroke-width="0" cx="29.99489" cy="35.67992" r="5"/>
  <circle id="svg_10" fill="${_addOnColor}" stroke-width="0" cx="17.495" cy="35.67992" r="5"/>
  <circle id="svg_2" fill="${_addOnColor}" stroke-width="0" cx="17.495" cy="23.18003" r="5"/>
  <circle id="svg_3" fill="${_addOnColor}" stroke-width="0" cx="29.995" cy="23.18003" r="5"/>`,

	`<circle fill="${_addOnColor}" stroke-width="0" cx="24.37" cy="35.05" r="4.42"/>
  <circle fill="${_addOnColor}" stroke-width="0" cx="13.87" cy="28.93" r="4.42"/>
  <circle fill="${_addOnColor}" stroke-width="0" cx="34.87" cy="28.93" r="4.42"/>
  <circle fill="${_addOnColor}" stroke-width="0" cx="24.37" cy="10.80" r="4.42"/>
  <circle fill="${_addOnColor}" stroke-width="0" cx="13.87" cy="16.93" r="4.42"/>
  <circle fill="${_addOnColor}" stroke-width="0" cx="34.87" cy="16.93" r="4.42"/>
  <circle fill="${_addOnColor}" stroke-width="0" cx="24.49" cy="22.68" r="4.42"/>`,
];

const drawSvg = (svgText, id, x, y, container = glob.elements.board) => {
	const div = document.createElement('div');
	div.innerHTML = svgText;
	const svgEl = div.firstChild;
	if (x !== undefined)
		svgEl.style.transform = `translate(${x}px, ${y}px)`;
	else
		svgEl.style.opacity = 0; // invisible until it gets animated in
	container.appendChild(svgEl);
	return document.getElementById(id);
};

// draw a hex item
// other color EE9E9E
export const drawHex = (id, classname, options = {}) => {

	let extras = Object.keys(options).reduce((prev, cur) => {
		return prev + _hextras[cur](id, options[cur]);
	}, '');

	if (extras !== '') {
		extras = `<g id="${id}-extras">${extras}</g>`;
	}

	const hexSvg = `<svg width="160" height="200" viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
	${options.frozen ? _metalGradient(id) : ''}
	<path id="${id}" class="${classname}" pointer-events="visible" transform="translate(0, 3) scale(1.1)" stroke-width="7" d="M67.95 3l64.95 37.5v75L67.95 153 3 115.5v-75z" fill-rule="evenodd"/>
	${extras}
	</svg>`;
	const el = drawSvg(hexSvg, id);
	const elements = {
		el,
		parent: el.parentNode,
	};
	if (extras !== '') {
		elements.extras = document.getElementById(`${id}-extras`);
	}
	return elements;
};

const _hextras = {
	arrow: (id, arrowDir) => {
		if (typeof arrowDir === 'number')
			return `<path pointer-events="none" id="${id}-arrow" class="svgarrow" transform="${_arrowTransforms[arrowDir]}" d="M144.4 127.5l14.86-14.84v29.7L144.4 127.5z" fill="${_addOnColor}"/>`;
		if (typeof arrowDir === 'object') {
			return arrowDir.reduce((prev, cur) =>
				prev + `<path pointer-events="none" id="${id}-arrow${cur}" class="svgarrow" transform="${_arrowTransforms[cur]}" d="M144.4 127.5l14.86-14.84v29.7L144.4 127.5z" fill="${_addOnColor}"/>`,
				'');
		}
	},
	dots: (id, numDots) => {
		return `<g pointer-events="none" transform="scale(1.5) translate(26, 35)">${_dotSvg[numDots - 1]}</g>`;
	},
	frozen: (id, isFrozen) => !isFrozen ? ''
		: `<g pointer-events="none">
		<path transform="translate(-4, -2) scale(1.16)" 
	stroke-width="0" fill-opacity="0.4" fill="url(#${id}metal)" d="M67.95 3l64.95 37.5v75L67.95 153 3 115.5v-75z" fill-rule="evenodd"/>
	<circle fill="#AAA" stroke-width="0" cx="75" cy="22" r="4"/>
	<circle fill="#AAA" stroke-width="0" cx="75" cy="156" r="4"/>
	<circle fill="#AAA" stroke-width="0" cx="17" cy="56" r="4"/>
	<circle fill="#AAA" stroke-width="0" cx="17" cy="123" r="4"/>
	<circle fill="#AAA" stroke-width="0" cx="133" cy="56" r="4"/>
	<circle fill="#AAA" stroke-width="0" cx="133" cy="123" r="4"/>
	</g>`,
	symbol: (id, symbol) => {
		if (symbol === '?') {
			return `<path transform="translate(57, 60) scale(0.5)" fill="${_addOnColor}" pointer-events="none" 
			d="M33.096 66.658h-2.85c-.093-5.024.15-8.78.73-11.27.58-2.489 2.085-5.918 4.518-10.285 2.433-4.368 4.032-7.876 4.797-10.524.764-2.647 1.147-5.918 1.147-9.81 0-6.02-1.205-10.456-3.615-13.307-2.41-2.852-5.26-4.277-8.55-4.277-2.503 0-4.612.656-6.326 1.969C21.649 10.149 21 11.19 21 12.277c0 .724.44 1.855 1.321 3.394 1.993 3.485 2.99 6.45 2.99 8.894 0 2.218-.777 4.074-2.33 5.567-1.552 1.494-3.487 2.24-5.804 2.24-2.595 0-4.773-.893-6.534-2.681C8.88 27.903 8 25.538 8 22.596c0-5.34 2.363-10.025 7.09-14.054C19.82 4.514 26.424 2.5 34.904 2.5c8.991 0 15.838 2.094 20.542 6.28 4.704 4.187 
			7.056 9.245 7.056 15.174 0 4.3-1.205 8.272-3.615 11.915-2.41 3.644-7.067 7.683-13.972 12.119-4.635 2.987-7.682 5.646-9.142 7.977-1.46 2.331-2.352 5.896-2.676 10.693zm-.765 9.913c3.105 0 5.747 1.063 7.925 3.19 2.178 2.128 3.267 4.708 3.267 7.74 0 3.033-1.089 5.624-3.267 7.774-2.178 2.15-4.82 3.225-7.925 3.225-3.105 0-5.746-1.075-7.924-3.225-2.179-2.15-3.268-4.741-3.268-7.774 0-3.032 1.09-5.612 3.268-7.74 2.178-2.127 4.82-3.19 7.924-3.19z"/>`
		}
	}
};

// draw a hex target on the background
export const drawHexTarget = (id, x, y, container) => {
	const hexTargetSvg = `<svg width="180" height="195" viewBox="0 0 180 195" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<filter x="-15.3%" y="-13.2%" width="130.6%" height="126.5%" filterUnits="objectBoundingBox" id="gauss1">
			<feGaussianBlur stdDeviation="7" in="SourceGraphic"/>
		</filter>
	</defs>
	<g pointer-events="visible" fill="none" fill-rule="evenodd">
		<path id="${id}" class="hex-target" filter="url(#gauss1)" d="M73.6 34l44.6 25.75v51.5L73.6 137 29 111.25v-51.5" transform="translate(9.000000, 9.000000)"/>
	</g>
	</svg>`;
	const el = drawSvg(hexTargetSvg, id, x, y, container);
	return {
		el,
		parent: el.parentNode,
	};
};