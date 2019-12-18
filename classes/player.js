 class Player {
    constructor(name){
        this.name = name;
        this.totalScore = 0;
        this.roundScore = 0;

    }

    calculateScore() {
    this.totalScore += this.roundScore
  }
  
  }

export default Player;
