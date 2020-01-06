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

  guessVowel(){
    this.roundScore = this.roundScore - 10;
  }
}

export default Player;
