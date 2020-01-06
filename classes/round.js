class Round {
  constructor(puzzle) {
    this.currentPuzzle = puzzle;
    this.trashLetters = [];
    // eslint-disable-next-line max-len
    this.lettersAvail = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    this.vowelsAvail = ['a', 'e', 'i', 'o', 'u'];
  }

  handleGuess(type, letter) {
    switch (type) {
    case 'vowel':
      this.vowelsAvail.splice(
        this.vowelsAvail.indexOf(letter), 1);
      this.trashLetters.push(letter);
      break;
    case 'consonant':
      this.lettersAvail.splice(
        this.lettersAvail.indexOf(letter), 1);
      this.trashLetters.push(letter);
      break;
    }
  }

  moveLettersToTrash(letter, type) {
    if (type === 'vowel') {
    let indexposition =  this.vowelsAvail.indexOf(letter);
      if(indexposition !== -1) {
        this.vowelsAvail.splice(indexposition, 1);
        this.trashLetters.push(letter);
      }
    }
  }

  countLetterMatches(testLetter) {
    return this.currentPuzzle.answer.toUpperCase().split('').filter((letter) => {
      return testLetter === letter;
    }).length
  };

  // guessVowel
}

export default Round;
