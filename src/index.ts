import './style.css';
import { Game } from './js/class/game';
import { Controller } from './js/class/controller';
import Tone from 'Tone';


const game = new Game();
const ctrl = new Controller(game);
ctrl.showStartInterface();

// stupid hack to be able to use audiocontext
document.documentElement.addEventListener(
  'mousedown', function () {
    if ((Tone as any).context.state !== 'running') {
      if ((Tone as any).context.resume) {
        (Tone as any).context.resume();
      }
      setTimeout(ctrl.startDemo, 500);
    }
  });

console.log('Hit shift+P to enter edit mode - then shift-click on a hex to change it');