import chai from 'chai';
const expect = chai.expect;
import Wheel from '../classes/wheel.js';
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

  it('should be able to choose a value', function () {
    expect(wheel.chooseValue()).to.be.within(0,19);
  });

  it('should be able to get a position', function () {
    let index = wheel.chooseValue();
    expect(wheel.getPosition(index)).to.be.within(3,4);
  });

});
