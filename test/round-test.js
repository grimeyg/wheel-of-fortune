import chai from 'chai';
const expect = chai.expect;
import Round from '../classes/round.js';
import $ from 'jquery';

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

  it.skip('should be able to add a letter to trash letters', function () {
    expect(round.handleGuess("A")).to.equal(["A"]);
  });

  it.skip('should be able to check the answer', function () {

  });

  it.skip('should be able to count letter matches', function () {

  });

});
