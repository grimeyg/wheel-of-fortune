import chai from 'chai';
const expect = chai.expect;
import Game from '../classes/game.js';
let game;


describe('Game', function () {

  beforeEach(() => {
    game = new Game();
  });

  it('should be a function', function () {
    game = new Game();
    expect(Game).to.be.a('function');
  });

  it('should be an instance of Game', function () {
    expect(game).to.be.an.instanceof(Game);
  });


  it('should be able to select a puzzle', function () {
    const randCount = Math.floor(Math.random() * Math.floor(this.puzzles.length));
    const chosenPuzzle = this.puzzles.splice(randCount, 1);
    expect(game.selectPuzzle()).to.equal(chosenPuzzle[0])
  });
});
