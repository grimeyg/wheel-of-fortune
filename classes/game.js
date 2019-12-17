import Player from './player.js';
import Puzzle from './puzzle.js';

class Game {
  constructor() {
    this.turn = 0;
    this.players = [];
    this.rounds = [];
    this.puzzles = this.loadPuzzles();
  }

  startGame(name1, name2, name3) {
    if (this.players.length === 0) {
      let player1 = new Player(name1);
      let player2 = new Player(name2);
      let player3 = new Player(name3);
      this.players.push(player1, player2, player3);
    }
  }

  loadPuzzles() {
    let allPuzzles = [];
    fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/wheel-of-fortune/data')
      .then(response => response.json())
      .then(data => Object.keys(data.data.puzzles).forEach  (puzzleType => {
        data.data.puzzles[puzzleType].puzzle_bank.forEach(puzzle => allPuzzles.push(new Puzzle(puzzle)))
      }))
      //should add an error handling alert 
      .catch(err => console.log(err))
    return allPuzzles;
  }
}


export default Game;
