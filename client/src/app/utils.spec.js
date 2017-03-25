import assert from 'assert';
import { extend } from './utils';

describe('.extend', () => {

  class Dolphin {

    constructor(name) {
      this.name = name;
    }

    swim() {
      return `${this.name} is swimming`;
    }
  }

  const { swim } = Dolphin.prototype;

  extend(Dolphin.prototype, {
    set speedMiles(speed) {
      this.speed = speed / 0.62;
    },

    get speedMiles() {
      return this.speed * 0.62;
    },

    breed() {
      return `${this.name} is breeding`;
    },

    swim(where) {
      return `${swim.call(this)} in ${where}`;
    }
  });

  it('mixes instance methods', () => {
    const dolphin = new Dolphin('Willy');
    assert.equal(dolphin.breed(), 'Willy is breeding');
  });

  it('calls the super method', () => {
    const dolphin = new Dolphin('Billy');
    assert.equal(dolphin.swim('the ocean'), 'Billy is swimming in the ocean');
  });

  it('mixes instance properties', () => {
    const dolphin = new Dolphin('Willy');

    dolphin.speed = 20;
    assert.equal(dolphin.speedMiles, 12.4);

    dolphin.speedMiles = 5;
    assert.equal(dolphin.speed, 8.064516129032258);
  });

});
