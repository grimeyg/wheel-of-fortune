class Puzzle {
  constructor(puzzle) {
    this.category = puzzle.category;
    this.answer = puzzle.correct_answer.toUpperCase();
    this.numberOfWords = puzzle.number_of_words;
    this.description = puzzle.description;
  }

  checkGuess(chosenLetter) {
   if (this.answer.toUpperCase().includes(chosenLetter)) {
     return true;
   } else {
   return false;
 }
}



}

export default Puzzle;
