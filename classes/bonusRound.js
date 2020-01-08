import Round from './round.js';

class BonusRound extends Round  {
  constructor(puzzle) {
    super(puzzle);
    this.prizes = ['food', 'rifle', 'oxen', 'wardrobe']
  }

  getPrize() {
    let prize = this.prizes[Math.floor((Math.random() * 4) + 0)];
    return prize;
  }
}

export default BonusRound;
