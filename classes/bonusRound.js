import Player from './player.js';
import Puzzle from './puzzle.js';
import Round from './round.js';
import scripts from './scripts.js';
import $ from 'jquery';

class BonusRound extends Round  {
  constructor(puzzle) {
    super(puzzle);
    this.prizes = ['food', 'rifle', 'oxen', 'wardrobe']
  }


  getPrize() {
   let prize = this.prizes[Math.floor((Math.random() * 4) + 0)];
   scripts.showPrize(prize);
   return prize;
 }

}



export default BonusRound;
