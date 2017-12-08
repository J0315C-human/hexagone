import "./style.css";
import { Game } from "./js/class/game";
import { Controller } from "./js/class/controller";

const game = new Game();

const ctrl = new Controller(game);

setTimeout(ctrl.startDemo, 800);