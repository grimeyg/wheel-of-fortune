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
    const score = matches * spinVal
    this.roundScore += score;
    return score;
  }
}

export default Player;
