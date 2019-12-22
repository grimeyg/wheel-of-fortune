import Game from '../classes/game.js';
import Player from '../classes/player.js';
import Puzzle from '../classes/puzzle.js';
import Round from '../classes/round.js';
import Wheel from '../classes/wheel.js';
import $ from 'jquery';

let game;


fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/wheel-of-fortune/data')
  .then(response => response.json())
  .then(data => loadPuzzles(data))
//should add an error handling alert
  .catch(err => console.log(err))

function loadPuzzles(data) {
  const allPuzzles = [];
  Object.keys(data.data.puzzles).forEach(puzzleType => {
    data.data.puzzles[puzzleType].puzzle_bank.forEach(puzzle => allPuzzles.push(new Puzzle(puzzle)))
  });
  game = new Game(allPuzzles);
  game.startGame()
}

const startGameButton = $(".start-game");
const startGameButton2 = $(".start-game2");
const body = $("body");


startGameButton.on("click", showInstructions);

function showInstructions() {
  //remove event listener
  // startGameButton.off("click", showInstructions)
  //add new EL
  startGameButton2.on("click", switchScreen);
  const mainPage = $("#main-page");
  const player1 = $("#player-1").val();
  const player2 = $("#player-2").val();
  const player3 = $("#player-3").val();
  const instructHeader = $(".instruction-header");
  const instructPage = $("#instruction-page");

  // mainPage.addClass("hidden");
  // instructPage.removeClass("hidden");
  if (player1 && player2 && player3) {
    mainPage.addClass("hidden");
    instructPage.removeClass("hidden");
    body.addClass("shadow");
    startGameButton.off("click", showInstructions)
    instructHeader.text(`Welcome Pioneers ${player1}, ${player2}, and ${player3}!`)
      }else{
    alert("Enter Pioneer Names!");;
  }

  mainPage.addClass("hidden");
  instructPage.removeClass("hidden");
  instructHeader.text(`Welcome Pioneers ${player1}, ${player2}, and ${player3}!`)
  displayLetters();

}

$(".solve").on("click", showGuessInput)
$(".solve-enter").on("click", clickSolveEnter)

function displayLetters() {
  const letterDis = game.rounds[0].currentPuzzle.returnLetters();
  let counter = 1;
  letterDis.forEach(word => {
    word.forEach(letter => {
      $(`#${counter}`).text(letter);
      counter++;
    })
    counter++;
  })
}

function switchScreen() {
  const instructPage = $("#instruction-page");
  $(instructPage).addClass('hidden')
  $('.game-page').removeClass('hidden');
}

function showGuessInput() {
  $('.solve-area').removeClass('hidden');
}

function clickSolveEnter() {
  $('.solve-area').addClass('hidden');
  // show with alert whether or not typed answer is correct
  // if correct end round and credit player thei
  // change turn to next player if incorrect guess
}

let sheet = $("#css");
let spinButton = $("#spin");

spinButton.click(() => {
  $(".wheel-1-animation, .wheel-2-animation").css("animation-iteration-count", "")
  $("#wheel1").removeClass("wheel-1-animation");
  $("#wheel2").removeClass("wheel-2-animation");
  $("#wheel1").removeClass("wheel-1");
  $("#wheel2").removeClass("wheel-2");
  $("#wheel1").addClass("wheel-1");
  $("#wheel2").addClass("wheel-2");
  let colors = ["red","black","green","blue","#E6D10F","orange","rebeccapurple","tan","gray","orange","teal","#E6D10F", "red", "black", "blue","green","rebeccapurple","gold"]
  let cards = document.querySelectorAll(".money-card");

  cards.forEach(card => {
    console.log(card);
    card.style.backgroundColor = colors[0];
    colors.shift();
  })

  let wheel = new Wheel();
  let currentValueIndex = wheel.chooseValue();
  let positionValue = wheel.getPosition(currentValueIndex);
  console.log(wheel.sections[currentValueIndex].value);
  console.log(positionValue);

  $(".wheel-1").addClass("wheel-1-animation");
  $(".wheel-2").addClass("wheel-2-animation");
  $(".wheel-1-animation, .wheel-2-animation").css("animation-iteration-count", `${positionValue}`)

});
