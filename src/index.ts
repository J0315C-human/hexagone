import './style.css';
import { Game } from './js/class/game';
import { Controller } from './js/class/controller';
import Tone from 'Tone';
import glob from './js/globals';

const game = new Game();
const ctrl = new Controller(game);
ctrl.showStartInterface();

function startAudioContext() {
  if ((Tone as any).context.state !== 'running') {
    if ((Tone as any).context.resume) {
      setTimeout(() => {
        (Tone as any).context.resume().then(() => {
          setTimeout(() => {
            if (glob.gameMode === 'start') {
              ctrl.startDemo();
            }
          }, 500);
        });
      }, 50);
    }
  } else {
    if (glob.gameMode === 'start') {
      ctrl.startDemo();
    }
  }
}

// stupid hack to be able to use audiocontext
document.documentElement.addEventListener(
  'mousedown', startAudioContext);

document.documentElement.addEventListener(
  'touchend', startAudioContext);


console.log('Hit shift+P to enter edit mode - then shift-click on a hex to change it');