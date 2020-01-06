class Player {
  constructor(name, num) {
    this.name = name;
    this.totalScore = 0;
    this.roundScore = 0;
    this.playerNum = num;
  }

  calculateRoundScore() {
    this.totalScore += this.roundScore;
  }

  calculateGuessScore(matches, spinVal) {
    this.roundScore += matches * spinVal;
  }
  
}

export default Player;
