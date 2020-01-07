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

  restrictGuess()
  $("#p1box").css("background-color", "orange");
}

const startGameButton = $(".start-game");
const startGameButton2 = $(".start-game2");
const body = $("body");

function matchLetter(e) {
  let letter = $(e.target).text().toUpperCase();
  let matches = game.rounds[game.round].countLetterMatches(letter);
  let vowelCheck = checkVowel(letter);
  if(vowelCheck === false){return console.log("no")};
  if(vowelCheck === true){game.currentPlayer.roundScore = game.currentPlayer.roundScore - 10};
  game.rounds[game.round].handleGuess(letter);
  if (spinResult === 'BANKRUPT') {
    game.currentPlayer.roundScore = 0;
  } else {
    game.currentPlayer.calculateGuessScore(matches, spinResult);
  }
  $(`.player-${game.currentPlayer.playerNum}-round-score`).text(game.currentPlayer.roundScore);
  $('.past-guesses').append(`<li class="past-guess">${letter}</li>`);
  $(e.target).attr('disabled', 'true');
  if (game.rounds[game.round].currentPuzzle.answer.split('').includes(letter)) {
    game.rounds[game.round].currentPuzzle.answer.split('').forEach((foundLetter) => {
      if (foundLetter === letter) {
        $(`div:contains(${letter})`).removeClass('hide-letter');
      }
    });
  } else {
    game.playerActive()
  }

  if (game.rounds[game.round].checkAnswerMatch()) {
    game.endRound();
  }
  restrictGuess()
}

function checkVowel(letter){
  if(letter === "A" || letter === "E" || letter === "I" || letter === "O" || letter === "U"){
    if(game.currentPlayer.roundScore > 9){
      return true
    } else {return false}
  } else {null}
}
// line 32 target the curr puzzle of the round do the includes on that

function restrictGuess() {
  $('.letterBank').children().addClass("hidden");
  $('.letterBank').append('<p class=\'spin-text\'>Please spin the wheel!</p>');
  //disable end of each turn
  //clear out after
}

function allowGuess() {
  $('.spin-text').remove();
  $('.letterBank').children().removeClass("hidden");
}

startGameButton.on("click", showInstructions);

$('.letterBank').on('click', (e) => {
  if ($(e.target).hasClass('vowel') || $(e.target).hasClass('consonants')) {
   matchLetter(e);
  }
});

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
    game.players[0].name = player1;
    game.players[1].name = player2;
    game.players[2].name = player3;
    $('.player-1-name').text(player1);
    $('.player-2-name').text(player2);
    $('.player-3-name').text(player3);
    displayLetters();
    } else {
    alert("Enter Pioneer Names!");
  }
}

function displayLetters() {
  const currPuzzle = game.rounds[game.round].currentPuzzle;
  const letterDis = currPuzzle.returnLetters();
  let counter = 1;
  $('.category').text(currPuzzle.category);
  $('.description').text(currPuzzle.description);
  letterDis.forEach(word => {
    word.forEach(letter => {
      $(`#${counter}`).text(letter).addClass('hide-letter');
      counter++;
    })
    counter++;
  })
}

function switchScreen() {
  const instructPage = $("#instruction-page");
  $(instructPage).addClass('hidden');
  $('.game-page').removeClass('hidden');
}

function showGuessInput() {
  $('.solve-area').removeClass('hidden');
  console.log(game.rounds[game.round].currentPuzzle.answer);
  $('.correct').text('');
  $('.incorrect').text('');
}

function clickSolveEnter() {
  $('.solve-area').addClass('hidden');
  const currPuzzle = game.rounds[game.round].currentPuzzle
  if($(".solve-input").val().toUpperCase() === currPuzzle.answer) {
    game.currentPlayer.roundScore += 75;
    game.currentPlayer.calculateRoundScore();
    game.endRound();
    $('.gameboard').children().text('');
    $('.guess-validation-msg').append('<span class="correct">Correct!!!</span>');
    updateBoard();
  } else {
    game.playerActive()
    $('.guess-validation-msg').append('<span class="incorrect">Sorry that is incorrect!</span>');
    }
    $('.solve-input').val('');
  }

  // $('.solve-area').addClass('hidden');
  // show with alert whether or not typed answer is correct
  // if correct end round and credit player thei
  // change turn to next player if incorrect guess



$(".solve").on("click", showGuessInput)
$(".solve-enter").on("click", clickSolveEnter)

let sheet = $("#css");
let spinButton = $("#spin");
let spinResult;

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
    card.style.backgroundColor = colors[0];
    colors.shift();
  })

  let wheel = new Wheel();
  let currentValueIndex = wheel.chooseValue();
  let positionValue = wheel.getPosition(currentValueIndex);
  spinResult = wheel.sections[currentValueIndex].value;

  $(".wheel-1").addClass("wheel-1-animation");
  $(".wheel-2").addClass("wheel-2-animation");
  $(".wheel-1-animation, .wheel-2-animation").css("animation-iteration-count", `${positionValue}`)

  allowGuess();
});

function updateBoard() {
  $('.gameboard').children().text('');
  displayLetters()
  $('.consonants').prop('disabled', false);
  $('.vowels').prop('disabled', false);
  $('.round-num').text(`Round ${game.round + 1}`)
}
