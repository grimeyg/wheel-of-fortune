import chai from 'chai';
const expect = chai.expect;
import Puzzle from '../classes/puzzle.js';
import Game from '../classes/game.js';
let puzzle;
let game;

describe('Puzzle', function () {
  beforeEach(() => {
    game = new Game();
    puzzle = new Puzzle(game.loadPuzzles()[0]);
    console.log(puzzle);
  });

  it('should be a function', function () {
    puzzle = new Puzzle();
    expect(Puzzle).to.be.a('function');
  });

  it('should be an instance of Puzzle', function () {
    expect(puzzle).to.be.an.instanceof(Puzzle);
  });

});
