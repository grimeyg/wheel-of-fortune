class Round {
  constructor(puzzle) {
    this.currentPuzzle = puzzle;
    this.trashLetters = [];
    // eslint-disable-next-line max-len
    this.lettersAvail = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
    this.vowelsBought = [];
    this.vowelsAvail = ['a', 'e', 'i', 'o', 'u', 'y'];
  }

  handleGuess(type, letter) {
    switch (type) {
    case 'vowel':
      this.vowelsAvail.splice(
        this.vowelsAvail.indexOf(letter), 1);
      this.vowelsBought.push(letter);
      break;
    case 'consonant':
      this.lettersAvail.splice(
        this.lettersAvail.indexOf(letter), 1);
      this.trashLetters.push(letter);
      break;
    }
  }
}

export default Round;
