import hexUtils from '../utils/hexUtils';

// code for live-changing the maps

export const handleBuildKey = (e, hex, boardData, hexIdx) => {
	if (e.shiftKey){
		alterHexType(e.keyCode, hex);
	} else {
		alterHexTiming(e.keyCode, hex);
	}
	hexUtils.updateMouseEvents(hex, boardData, hexIdx);
};


// for Build mode - keypress handlers
export const alterHexTiming = (keyCode, hex) => {
	const newHex = {
		timing: { ...hex.timing },
	};
	if (hex.type === 'buffer') {
		newHex.dir = hex.directions;
	}
	if (hex.type !== undefined)
		newHex.type = hex.type;
	switch (keyCode) {
		case 37: //left - change delay
			if (hex.timing.interval !== undefined)
				newHex.timing.delay = (hex.timing.interval + hex.timing.delay - 1) % hex.timing.interval;
			else
				newHex.timing.delay = hex.timing.delay <= 1 ? 7 : hex.timing.delay - 1;
			break;
		case 38: // up - change interval
			if (hex.timing.interval !== undefined) {

				if (hex.timing.interval >= 7)
					newHex.timing.interval = 1;
				else
					newHex.timing.interval = hex.timing.interval + 1;
				newHex.timing.delay = hex.timing.delay % newHex.timing.interval;
			}
			break;
		case 39: //right - change delay
			if (hex.timing.interval !== undefined)
				newHex.timing.delay = (hex.timing.delay + 1) % hex.timing.interval;
			else
				newHex.timing.delay = hex.timing.delay >= 7 ? 1 : hex.timing.delay + 1;
			break;
		case 40: //down - change interval
			if (hex.timing.interval !== undefined) {

				if (hex.timing.interval <= 1)
					newHex.timing.interval = 7;
				else
					newHex.timing.interval = hex.timing.interval - 1;
				newHex.timing.delay = hex.timing.delay % newHex.timing.interval;
			}
			break;
		default:
			return false;
	}
	console.log('delay ' + newHex.timing.delay + ', interval ' + newHex.timing.interval);
	hex.replaceWith(newHex);

};

export const alterHexType = (keyCode, hex) => {

	const newHex = {
		timing: { ...hex.timing },
		type: hex.type,
	};

	switch (keyCode) {
		case 37: //left - change direction -
			if (hex.type === 'buffer') {
				const prevDir = hex.directions[0] || 0;
				newHex.dir = [(prevDir + 5) % 6];
			}
			break;
		case 39: //right - change direction + 
			if (hex.type === 'buffer') {
				const prevDir = hex.directions[0] || 0;
				newHex.dir = [(prevDir + 7) % 6];
			}
			break;
		case 38: // up - change type
		case 40: //down - change type
			if (hex.type === 'buffer') {
				newHex.type = undefined;
				newHex.timing = {
					delay: 0,
					interval: hex.timing.delay
				};
			}
			else {
				newHex.type = 'buffer';
				newHex.timing = {
					delay: hex.timing.interval,
				};
				newHex.dir = [1];
			}

			break;
		default:
			return false;
	}
	console.dir(newHex);
	hex.replaceWith(newHex);
};