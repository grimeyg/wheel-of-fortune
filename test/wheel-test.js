import chai from 'chai';
const expect = chai.expect;
import Wheel from '../classes/puzzle.js';
let wheel;


describe('Wheel', function () {

  beforeEach(() => {
    wheel = new Wheel();
  });

  it('should be a function', function () {
    wheel = new Wheel();
    expect(Wheel).to.be.a('function');
  });

  it('should be an instance of Wheel', function () {
    expect(wheel).to.be.an.instanceof(Wheel);
  });

});
