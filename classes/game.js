import Player from './player.js';


class Game {
    constructor() {
        this.turn = 0;
        this.players = [];
        this.rounds = [];
        this.puzzles = [];
    }

   startGame(name1, name2, name3) {
     if(this.players.length === 0) {
       let player1 = new Player(name1);
       let player2 = new Player(name2);
       let player3 = new Player(name3);
       this.players.push(player1, player2, player3);
     };
   };
 };


  export default Game;
