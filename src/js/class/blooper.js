import { Compressor, Vibrato, Freeverb, PolySynth, Synth } from 'Tone';
import tunes from '../tunes';
import glob from '../globals';

let compressor = new Compressor(-20, 3).toMaster();
let beepCompressor = new Compressor(0, 3).connect(compressor);
let _tremolo = new Vibrato(5, 0.2).connect(compressor);
let _freeverb = new Freeverb().connect(compressor);
let _tremolo2 = new Vibrato(2.5, 0.07).connect(_freeverb);

_freeverb.dampening.value = 1000;

const _noteTriggerDelay = glob.preschedule_ms / 1000;

const _defaultScale = [
	'A4', 'B4', 'C4', 'D4', 'E4', 'F#4', 'G4',
	'A5', 'B5', 'C5', 'D5', 'E5', 'F#5', 'G5',
	'E3', 'F#3', 'G3', 'A6', 'B6', 'C6', 'D6',
];

const _beepSettings = {
	'oscillator': {
		type: 'sine'
	},
	'envelope': {
		'attack': 0.01,
		'decay': 0.2,
		'release': 1
	}
};

const _padSettings = {
	'oscillator': {
		type: 'square'
	},
	'envelope': {
		'attack': 0.01,
		'decay': 1,
		'sustain': 0.7,
		'release': 4
	}
};

const _ringSettings = {
	'oscillator': {
		type: 'sine'
	},
	'envelope': {
		'attack': 0.5,
		'decay': 0.5,
		'sustain': 0.5,
		'release': 20
	}
};
export class Blooper {
	constructor(initialTune) {
		this.beep = new PolySynth(6, Synth, _beepSettings).connect(beepCompressor);
		this.pad = new PolySynth(8, Synth, _padSettings).connect(_tremolo2);
		this.ring = new PolySynth(12, Synth, _ringSettings).connect(_tremolo);
		this.beep.set('volume', -14);
		this.pad.set('volume', -40);
		this.ring.set('volume', -18);

		this.beepNotes = [];
		this.padNotes = [];
		this.newPadNotes = [];
		this.ringNotes = [];
		this.allowPadTrigger = false;
		this.scale = _defaultScale;
		this.tune = {
			changes: [],
			length: 1
		};

		this.loadTune(initialTune);
	}

	updateChordChange(beatNumber) {
		let beatsIntoChanges = 0;
		const beat = beatNumber % this.tune.length;
		for (let change of this.tune.changes) {
			if (beat === beatsIntoChanges) {
				this.addPads(change.notes);
				this.allowPadTrigger = true;
				break;
			}
			beatsIntoChanges += change.beats;
		}
	}

	addBeeps(noteIndexes) {
		noteIndexes.map(n => this.scale[n % this.scale.length])
			.forEach(note => {
				if (!this.beepNotes.includes(note))
					this.beepNotes.push(note);
			});
	}

	triggerBeeps(time) {
		this.beep.triggerAttackRelease(this.beepNotes, 0.1, time + _noteTriggerDelay);
		this.beepNotes = [];
	}


	addRings(noteIndexes) {
		noteIndexes.map(n => this.scale[n % this.scale.length])
			.forEach(note => {
				if (!this.ringNotes.includes(note))
					this.ringNotes.push(note);
			});
	}

	triggerRings(time) {
		this.ring.triggerAttackRelease(this.ringNotes, 0.5, time + _noteTriggerDelay);
		this.ringNotes = [];
	}

	addPads(notes) {
		notes.forEach(note => {
			this.newPadNotes.push(note);
		});
	}

	triggerPads(time) {
		const addNotes = this.newPadNotes.filter(n => { return !(n in this.padNotes); });
		const removeNotes = this.padNotes.filter(n => { return !(n in this.newPadNotes); });
		const triggerTime = time + _noteTriggerDelay;
		if (removeNotes)
			this.pad.triggerRelease(removeNotes, triggerTime);
		if (addNotes) {
			this.pad.triggerAttack(this.newPadNotes, triggerTime);
		}
		this.padNotes = this.newPadNotes;
		this.newPadNotes = [];
	}

	stopPad(clearNotes = true) {
		this.pad.triggerRelease(this.padNotes, `+${_noteTriggerDelay}`);
		if (clearNotes) {
			this.padNotes = [];
			this.newPadNotes = [];
		}
	}

	restartPad() {
		if (this.padNotes.length > 0)
			this.pad.triggerAttack(this.padNotes, `+${_noteTriggerDelay}`);
	}

	triggerAll(time) {
		this.triggerBeeps(time);
		this.triggerRings(time);
		if (this.allowPadTrigger) {
			this.triggerPads(time);
			this.allowPadTrigger = false;
		}
	}

	loadTune(tune) {
		const { changes, scale } = tune;
		this.clear();
		this.scale = scale;
		this.tune.changes = changes;
		this.tune.length = changes.reduce((prev, cur) => cur.beats + prev, 0);
	}

	clear() {
		this.stopPad();
		this.padNotes = [];
		this.beepNotes = [];
		this.ringNotes = [];
		this.newPadNotes = [];
	}
}