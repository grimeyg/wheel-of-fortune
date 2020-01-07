import Player from './player.js';
import Puzzle from './puzzle.js';
import Round from './round.js';
import $ from 'jquery';

class Game {
  constructor(puzzles) {
    this.round = 0;
    this.players = [];
    this.rounds = [];
    this.puzzles = puzzles;
    this.currentPlayer = null;
  }

  startGame(name1, name2, name3) {
    if (this.players.length === 0) {
      let player1 = new Player(name1, 1);
      let player2 = new Player(name2, 2);
      let player3 = new Player(name3, 3);
      this.players.push(player1, player2, player3);
    }
    this.currentPlayer = this.players[0]
    this.rounds.push(new Round(this.selectPuzzle()))
  }

  selectPuzzle() {
    const randCount = Math.floor(Math.random() * Math.floor(this.puzzles.length));
    const chosenPuzzle = this.puzzles.splice(randCount, 1);
    return chosenPuzzle[0];
  }

  playerActive() {
    if (this.currentPlayer === this.players[0]) {
      this.currentPlayer = this.players[1];
      $("#p1box").css("background-color", "");
      $("#p2box").css("background-color", "yellow");
    } else if (this.currentPlayer === this.players[1]) {
      this.currentPlayer = this.players[2];
      $("#p2box").css("background-color", "");
      $("#p3box").css("background-color", "yellow");
    } else if (this.currentPlayer === this.players[2]) {
      this.currentPlayer = this.players[0];
      $("#p3box").css("background-color", "");
      $("#p1box").css("background-color", "yellow");
    }
  }

  endRound() {
    this.round++;
    if(this.round < 3) {
      this.rounds.push(new Round(this.selectPuzzle()))
      this.players.forEach(player => {
        player.roundScore = 0;
      })
    } else {
      // enter bonus round, sort the player with highest totalScore, pop that player out
      // have that player enter the round with a new puzzle, possibly new rules
    }
  }
}


export default Game;
