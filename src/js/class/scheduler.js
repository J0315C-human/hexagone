import glob from '../globals';
import { Transport } from 'Tone';
import autoBind from '../utils/autobind';

const _minNewHexTime = 3;
const _maxNewHexTime = 32;
export class Scheduler {
	constructor(game) {
		this.game = game;
		this.blooper = game.blooper;
		this.beat = 0;
		this.transport = Transport.start('+0.2');
		this.transport.bpm.value = 60000 / glob.beat_ms;
		this.transport.ppq = 64;
		// callback Ids
		this.updateGameId = null;
		this.triggerSoundsId = null;
		this.delayId = null;

		this.lastBeatTime = null;
		this.nextBeatDelay = null;

		this.sinceLastRandomHex = 0;
		autoBind(this);
	}

	reset() {
		this.stopSchedule();
		this.lastBeatTime = null;
		this.nextBeatDelay = null;
		this.beat = 0;
		this.lastNewRandomHex = 0;
	}

	play() {
		if (this.lastBeatTime === null) { // first beat, no interim to account for
			this.startSchedule();
		} else {
			clearInterval(this.delayId);
			const delay = this.lastBeatTime ?
				glob.beat_ms - this.nextBeatDelay : 0;
			this.delayId = setTimeout(this.startSchedule, delay);
		}
		this.blooper.restartPad();
	}

	onBeat(timeScheduled) {
		Promise.resolve(this.updateGame())
			.then(() => this.triggerSounds(timeScheduled));
	}

	startSchedule() {
		this.transport.clear(this.updateGameId);
		this.transport.clear(this.triggerSoundsId);
		this.updateGameId = this.transport.scheduleRepeat(this.onBeat, '4n', '+16n');
	}

	stopSchedule() {
		this.transport.clear(this.updateGameId);
		this.transport.clear(this.triggerSoundsId);
		clearInterval(this.delayId);
		this.updateGameId = null;
		this.triggerSoundsId = null;
		this.delayId = null;
	}

	pause() {
		this.nextBeatDelay = performance.now() - this.lastBeatTime;
		this.stopSchedule();
		this.blooper.stopPad(false);
	}

	updateGame() {
		this.game.nextBeat(this.beat);
		if (glob.gameMode === 'arcade') {
			this.sinceLastRandomHex++;
			// random hex addition if 'arcade mode' is on.
			if (this.sinceLastRandomHex > _minNewHexTime) {
				if (this.sinceLastRandomHex > _maxNewHexTime ||
					this.game.checkWin('normals') ||
					Math.random() < ((this.beat + 20) / 1000)) {
					this.sinceLastRandomHex = 0;
					this.game.addRandomHex();
				}
			}
		}
		const { flashing,
			flashingNotes,
			dying,
			dyingNotes } = this.game.getSoundingHexes();

		this.blooper.addBeeps(flashing, flashingNotes);
		this.blooper.addRings(dying, dyingNotes);
		this.blooper.updateChordChange(this.beat);

		this.beat += 1;
		this.lastBeatTime = performance.now();
	}

	// timeDelta is subtracted from preschedule_ms to schedule the audio events
	triggerSounds(timeScheduled) {
		this.blooper.triggerAll(timeScheduled);
	}

}