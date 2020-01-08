import Game from '../classes/game.js';
import Puzzle from '../classes/puzzle.js';
import $ from 'jquery';

let game;

let colors = ["red", "black", "green", "blue", "#E6D10F", "orange", "rebeccapurple", "tan", "gray", "orange", "teal", "#E6D10F", "red", "black", "blue", "green", "rebeccapurple", "gold"]
let cards = document.querySelectorAll(".money-card");

cards.forEach(card => {
  card.style.backgroundColor = colors[0];
  colors.shift();
})

fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/wheel-of-fortune/data')
  .then(response => response.json())
  .then(data => loadPuzzles(data))
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


function spinResultCheck() {
  if (spinResult === 'BANKRUPT') {
    game.currentPlayer.roundScore = 0;
    $(`.player-${game.currentPlayer.playerNum}-round-score`)
      .text(`Round Score: ${game.currentPlayer.roundScore}`);
    game.playerActive();
    restrictGuess();
    alertDisplay('bankrupt');
  } else if (spinResult === 'LOSE TURN') {
    game.playerActive();
    restrictGuess()
    alertDisplay('loseTurn');
  } else {
    allowGuess();
  }
}

function guessResult(letter, matches) {
  const score = game.currentPlayer.calculateGuessScore(matches, spinResult);
  game.rounds[game.round].handleGuess(letter);
  $(`.player-${game.currentPlayer.playerNum}-round-score`)
    .text(`Round Score: ${game.currentPlayer.roundScore}`);
  $('.past-guesses').append(`<li class="past-guess">${letter}</li>`);
  if (matches) {
    alertDisplay('match', 0, matches, score);
  } else {
    alertDisplay('noMatch');
  }
}

function checkClickPuzzleComp() {
  if (game.rounds[game.round].checkAnswerMatch()) {
    game.currentPlayer.calculateRoundScore();
    $(`.player-${game.currentPlayer.playerNum}-total-score`)
      .text(`Total Score: ${game.currentPlayer.totalScore}`);
    game.endRound();
    updateBoard();
  }
}

function matchLetter(e) {
  let letter = $(e.target).text().toUpperCase();
  let matches = game.rounds[game.round].countLetterMatches(letter);

  let vowelCheck = checkVowel(letter);
  if (vowelCheck === false) {
    return alertDisplay('noVowel');
  }
  if (vowelCheck === true) {
    game.currentPlayer.roundScore = game.currentPlayer.roundScore - 10;
    guessTrigger(e, letter, matches)
    return alertDisplay('vowel');
  }

  guessTrigger(e, letter, matches)
  guessResult(letter, matches);
}

function guessTrigger(e, letter, matches) {
  $(e.target).attr('disabled', 'true');
  flipMatchedLetters(letter, matches);

  $(".solve").prop('disabled', false)
  $("#spin").prop('disabled', false)
  checkClickPuzzleComp()
  restrictGuess()
}

function flipMatchedLetters(letter, matches) {
  if (matches) {
    game.rounds[game.round].currentPuzzle.answer.split('').forEach((foundLetter) => {
      if (foundLetter === letter) {
        $(`div:contains(${letter})`).removeClass('hide-letter');
      }
    });
  } else {
    game.playerActive()
  }
}

function checkVowel(letter) {
  if (letter === "A" || letter === "E" || letter === "I" || letter === "O" || letter === "U") {
    if (game.currentPlayer.roundScore > 9) {
      return true
    } else {return false}
  } else {null}
}

function restrictGuess() {
  $('.letterBank').children().addClass("hidden");
  $('.letterBank').append('<p class=\'spin-text\'>Please spin the wheel!</p>');
}

function allowGuess() {
  $("#spin").prop('disabled', true);
  $(".solve").prop('disabled', true);
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
  startGameButton2.on("click", switchScreen);
  const mainPage = $("#main-page");
  const player1 = $("#player-1").val();
  const player2 = $("#player-2").val();
  const player3 = $("#player-3").val();
  const instructHeader = $(".instruction-header");
  const instructPage = $("#instruction-page");

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

function displayLetters(bonusStatus) {
  const currPuzzle = game.rounds[game.round].currentPuzzle;
  const letterDis = currPuzzle.returnLetters();
  let counter = 1;
  $('.category').text(currPuzzle.category);
  $('.description').text(currPuzzle.description);
  if (bonusStatus) {
    letterDis.forEach(word => {
      word.forEach(letter => {
        $(`#${Math.floor(Math.random() * 30)}`).text(letter).addClass('hide-letter');
      })
    })
  } else {
    letterDis.forEach(word => {
      word.forEach(letter => {
        $(`#${counter}`).text(letter).addClass('hide-letter');
        counter++;
      })
      counter++;
    })
  }
}

function alertDisplay(alertType, spin, matchCount, score) {
  switch (alertType) {
  case 'bankrupt':
    $('.alerts').text('Your wagon broke down, you had to pay for repairs, you’re bankrupt!');
    break;
  case 'loseTurn':
    $('.alerts').text('Your child caught dysentery! Lose a turn.');
    break;
  case 'spin':
    $('.alerts').text(`You spun a ${spin}`);
    break;
  case 'match':
    $('.alerts').text(`You matched ${matchCount} times, earned ${score} gold for your journey!`);
    break;
  case 'noMatch':
    $('.alerts').text(`No matches, better luck further down the trail!`);
    break;
  case 'noVowel':
    $('.alerts').text(`You don't have the funds for that vowel traveler!`);
    break;  
  case 'vowel':
    $('.alerts').text(`Enjoy that shiny new vowel.`);
    break;  
  case 'puzzleGuessWin':
    $('.alerts').text('Good guess traveler! Here\'s 75 gold! Spin first on the next puzzle.');
    break;
  case 'puzzleGuessLoss':
    $('.alerts').text('Not quite right, keep on panning.');
    break;
  }
}

function switchScreen() {
  const instructPage = $("#instruction-page");
  $(instructPage).addClass('hidden');
  $('.game-page').removeClass('hidden');
}

function showGuessInput() {
  $("#spin").prop('disabled', true);
  $('.solve-area').removeClass('hidden');
  console.log(game.rounds[game.round].currentPuzzle.answer);
  $('.correct').text('');
  $('.incorrect').text('');
}

function clickSolveEnter() {
  $('.solve-area').addClass('hidden');
  const currPuzzle = game.rounds[game.round].currentPuzzle;
  if ($(".solve-input").val().toUpperCase() === currPuzzle.answer) {
    if (game.round === 3) {
      game.currentPlayer.roundScore += 100;
      game.currentPlayer.calculateRoundScore();
      $('.game-page').addClass('hidden');
      $('.results-page').html(`
      <h3>Correct! Congratulations, ${game.currentPlayer.name}!</h3>
      <p>You finished the trail with ${game.currentPlayer.totalScore} gold.</p>
      `);
      $('.results-page').removeClass('hidden');
    } else {
      game.currentPlayer.roundScore += 75;
      game.currentPlayer.calculateRoundScore();
      $(`.player-${game.currentPlayer.playerNum}-total-score`)
        .text(`Total Score: ${game.currentPlayer.totalScore}`);
      game.endRound();
      $('.gameboard').children().text('');
      alertDisplay('puzzleGuessWin')
      $(".solve").prop('disabled', false)
      $("#spin").prop('disabled', false)
      updateBoard();
    }
  } else {
    if (game.round === 3) {
      $('.game-page').addClass('hidden');
      $('.results-page').html(`
      <h3>Incorrect, but good try ${game.currentPlayer.name}!</h3>
      <p>You still finished the trail with ${game.currentPlayer.totalScore} gold.</p>
      <p>Congratulations!</p>
      `);
      $('.results-page').removeClass('hidden');
    } else {
      game.playerActive()
      alertDisplay('puzzleGuessLoss')
      $(".solve").prop('disabled', false)
      $("#spin").prop('disabled', false)
    }
    $('.solve-input').val('');
  }
}

$(".solve").on("click", showGuessInput)
$(".solve-enter").on("click", clickSolveEnter)

let spinButton = $("#spin");
let spinResult;

spinButton.click(() => {
  let currentValueIndex = game.wheel.chooseValue();
  let positionValue = game.wheel.getPosition(currentValueIndex);
  spinResult = game.wheel.sections[currentValueIndex].value;

  alertDisplay('spin', spinResult);

  if ($(".wheel-1").hasClass("wheel-1-animation")) {
    $(".wheel-1-animation, .wheel-2-animation").css("animation-iteration-count", "");
    $(".wheel-2").removeClass("wheel-2-animation");
    $(".wheel-1").removeClass("wheel-1-animation");
    $(".wheel-1").addClass("wheel-3-animation");
    $(".wheel-2").addClass("wheel-4-animation");
    $(".wheel-3-animation, .wheel-4-animation").css("animation-iteration-count", `${positionValue}`)
  } else {
    $(".wheel-3-animation, .wheel-4-animation").css("animation-iteration-count", "")
    $(".wheel-2").removeClass("wheel-4-animation");
    $(".wheel-1").removeClass("wheel-3-animation");
    $(".wheel-1").addClass("wheel-1-animation");
    $(".wheel-2").addClass("wheel-2-animation");
    $(".wheel-1-animation, .wheel-2-animation").css("animation-iteration-count", `${positionValue}`)
  }
  spinResultCheck();
});

function updateBoard() {
  $('.gameboard').children().text('');
  
  if (game.round === 3) {
    displayLetters('bonus')
    topPlayerHighlight()
    $('.round-num').text('Bonus Round!')
    $('.gameboard').css('background-color', 'orange');
    $('.alerts').text(`You won ${game.currentPlayer.name}! Now see if you can strike it big! You get one guess at this one!`);
    $('.letterBank').children().addClass("hidden");
    $('.solve-area').removeClass('hidden');
    $("#spin").prop('disabled', true);
    $(".solve").prop('disabled', true);
  } else {
    displayLetters()
    $('.round-num').text(`Round ${game.round + 1}`)
  }
  $('.consonants').prop('disabled', false);
  $('.vowels').prop('disabled', false);
}

function topPlayerHighlight() {
  $("#p1box").css("background-color", "");
  $("#p2box").css("background-color", "");
  $("#p3box").css("background-color", "");
  $(`#p${game.currentPlayer.playerNum}box`).css("background-color", "orange");
}