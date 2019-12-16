import chai from 'chai';
const expect = chai.expect;
import Puzzle from '../classes/puzzle.js';
let puzzle;


describe('Puzzle', function () {

  beforeEach(() => {
    puzzle = new Puzzle();
  });

  it('should be a function', function () {
    puzzle = new Puzzle();
    expect(Puzzle).to.be.a('function');
  });

  it('should be an instance of Puzzle', function () {
    expect(puzzle).to.be.an.instanceof(Puzzle);
  });

});
