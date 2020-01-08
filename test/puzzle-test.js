import chai from 'chai';
const expect = chai.expect;
import Puzzle from '../classes/puzzle.js';
import Game from '../classes/game.js';
let puzzle;
let game;
let puzzleData = [
{
category: "Around The House",
number_of_words: 1,
total_number_of_letters: 8,
first_word: 8,
description: "Location or object(s) found within a typical house.",
correct_answer: "Armchair"
},
{
category: "The 90s",
number_of_words: 1,
total_number_of_letters: 7,
first_word: 7,
description: "Puzzles pertaining to the decade in question.",
correct_answer: "Beepers"
},
{
category: "The 90s",
number_of_words: 1,
total_number_of_letters: 10,
first_word: 10,
description: "Puzzles pertaining to the decade in question.",
correct_answer: "Tamagotchi"
},
{
category: "Around The House",
number_of_words: 1,
total_number_of_letters: 6,
first_word: 6,
description: "Location or object(s) found within a typical house.",
correct_answer: "Teapot"
}
];

describe('Puzzle', function () {
  beforeEach(() => {
    game = new Game(puzzleData);
    console.log(game.selectPuzzle().category)
    puzzle = new Puzzle(game.selectPuzzle());
  });

  it('should be a function', function () {
    expect(Puzzle).to.be.a('function');
  });

  it('should be an instance of Puzzle', function () {
    expect(puzzle).to.be.an.instanceof(Puzzle);
  });

  it('should be able to return letters', function () {
    expect(puzzle.returnLetters()).to
  });

  it('should be able to check a guess', function () {
    expect(puzzle.checkGuess(chosenLetter)).to
  });

});
