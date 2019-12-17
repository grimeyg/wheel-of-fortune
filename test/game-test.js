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

});
