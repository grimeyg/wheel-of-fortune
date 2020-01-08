import chai from 'chai';
const expect = chai.expect;
import Round from '../classes/round.js';

describe('Round', function () {
  let round;

  beforeEach(() => {
    round = new Round();
  });

  it('should be a function', function () {
    round = new Round();
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', function () {
    expect(round).to.be.an.instanceof(Round);
  });

  it('should be able to add a letter to trash letters', function () {
    round.handleGuess('A');
    expect(round.trashLetters[1]).to.equal('A');
  });
});
