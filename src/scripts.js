import Game from '../classes/game.js';
import Player from '../classes/player.js';
import Puzzle from '../classes/puzzle.js';
import Round from '../classes/round.js';
import Wheel from '../classes/wheel.js';
import $ from 'jquery';

const game = new Game();

var changeButton = document.querySelector(".change-button")
changeButton.addEventListener("click", switchScreen)

function switchScreen() {
  document.querySelector('.activity-section').classList.add('hidden')
  document.querySelector('.game-page').classList.remove('hidden');
}

let sheet = $("#css");
let spinButton = $("#spin");

spinButton.click(() => {
  let wheel = new Wheel();
  wheel.chooseValue();
console.log(sheet);
  document.styleSheets[2].insertRule(`
    @keyframes wheel-1-animate {
    0% {
    }

    50% {
      bottom: -100%;
    }

    50.1% {
      bottom: 100%;
    }

    100% {
      bottom: 0;
    }
  }`, document.styleSheets[2].length);

  document.styleSheets[2].insertRule(`
    @keyframes wheel-2-animate {
      0% {
      }

      50% {
        bottom: 0px;
      }

      100%{
        bottom: -100%;
      }
    }`, document.styleSheets[2].length);

  $(".wheel-1").addClass("wheel-1-animation");
  $(".wheel-2").addClass("wheel-2-animation");
});
