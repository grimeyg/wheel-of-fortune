class Round {
  constructor(puzzle) {
    this.currentPuzzle = puzzle;
    this.trashLetters = [];
    // eslint-disable-next-line max-len
    this.lettersAvail = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
    this.vowelsBought = [];
    this.vowelsAvail = ['a', 'e', 'i', 'o', 'u', 'y'];
  }
}

export default Round;
