import Game from '../classes/game.js';
import Player from '../classes/player.js';
import Puzzle from '../classes/puzzle.js';
import Round from '../classes/round.js';
import Wheel from '../classes/wheel.js';
import $ from 'jquery';

const startGameButton = $(".start-game");



startGameButton.on("click", showInstructions);

function showInstructions() {
  const mainPage = $("#main-page");
  const player1 = $("#player-1").val();
  const player2 = $("#player-2").val();
  const player3 = $("#player-3").val();
  const instructHeader = $(".instruction-header");
  const instructPage = $("#instruction-page");
  mainPage.addClass("hidden");
  instructPage.removeClass("hidden");
  // console.log(`Welcome Pioneers ${player1}, ${player2}, and ${player3}!`)
  instructHeader.text(`Welcome Pioneers ${player1}, ${player2}, and ${player3}!`)
}
