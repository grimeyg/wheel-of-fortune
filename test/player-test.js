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


  
});
