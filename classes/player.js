class Player {
  constructor(name) {
    this.name = name;
    this.totalScore = 0;
    this.roundScore = 0;

  }

  calculateRoundScore() {
    this.totalScore += this.roundScore
  }

  calculateGuessScore(matches, spinVal) {
    this.roundScore += matches * spinVal;
  }
  
}

export default Player;
