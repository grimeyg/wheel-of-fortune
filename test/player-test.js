import chai from 'chai';
const expect = chai.expect;
import Player from '../classes/player.js';

describe('Player', function () {
  let player;

  beforeEach(() => {
    player = new Player();
  });

  it('should be a function', () => {
    expect(Player).to.be.a('function');
  });

  it('should be an instance of Player', () => {
    expect(player).to.be.an.instanceof(Player);
  });

  it('should be able to calculate the round score', () => {
    expect(player.calculateRoundScore()).to.equal(0);
  });

  it('should be able to calculate the guess score', () => {
    expect(player.calculateGuessScore()).to.equal(0);
  });

  it('should be able to subtract from the users score', () => {
    expect(player.guessVowel()).to.equal(player.roundScore -10);
  });

});
