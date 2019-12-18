import Player from './player.js';
import Puzzle from './puzzle.js';
import Round from './round.js';

class Game {
  constructor(puzzles) {
    this.turn = 0;
    this.players = [];
    this.rounds = [];
    this.puzzles = puzzles;
  }

  startGame(name1, name2, name3) {
    if (this.players.length === 0) {
      let player1 = new Player(name1);
      let player2 = new Player(name2);
      let player3 = new Player(name3);
      this.players.push(player1, player2, player3);
    }
    this.rounds.push(new Round(this.selectPuzzle()))
  }

  selectPuzzle() {
    const randCount = Math.floor(Math.random() * Math.floor(this.puzzles.length));
    const chosenPuzzle = this.puzzles.splice(randCount, 1);
    return chosenPuzzle[0];
  }


}


export default Game;
