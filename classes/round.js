class Round {
  constructor(puzzle) {
    this.currentPuzzle = puzzle;
    this.trashLetters = [' '];
    // eslint-disable-next-line max-len
    this.lettersAvail = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 'a', 'e', 'i', 'o', 'u'];
    // this.vowelsAvail = [];
  }

  //need to check if trashLetters cover all of answers
  //make a remove duplicate array of unique letters

  handleGuess(letter) {
    // case 'vowel':
    //   this.vowelsAvail.splice(
    //     this.vowelsAvail.indexOf(letter), 1);
    //   this.trashLetters.push(letter);
    //   break;
    this.lettersAvail.splice(
      this.lettersAvail.indexOf(letter), 1);
    this.trashLetters.push(letter);
  }

  checkAnswerMatch() {
    const answerLetters = [... new Set(this.currentPuzzle.answer.split(''))];
    return answerLetters.every(letter => this.trashLetters.includes(letter))
  }

  countLetterMatches(testLetter) {
    return this.currentPuzzle.answer.toUpperCase().split('').filter((letter) => {
      return testLetter === letter;
    }).length
  }

}

export default Round;
