import Game from '../classes/game.js';
import Player from '../classes/player.js';
import Puzzle from '../classes/puzzle.js';
import Round from '../classes/round.js';
import Wheel from '../classes/wheel.js';

const game = new Game();

var changeButton = document.querySelector(".change-button")
changeButton.addEventListener("click", switchScreen)

function switchScreen() {
  document.querySelector('.activity-section').classList.add('hidden')
  document.querySelector('.game-page').classList.remove('hidden');
}
