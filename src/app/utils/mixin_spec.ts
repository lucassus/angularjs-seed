import { expect } from 'chai';
import mixin from './mixin';

describe('mixin', () => {

  class MammalMixin {
    breed() {
      return `${this.name} is breeding`;
    }
  }

  class FishMixin {
    static get environment() {
      return 'sea';
    }

    static get KM_TO_MILE() {
      return 0.62;
    }

    get speed() {
      return this._speed;
    }

    get speedMiles() {
      return this.speed * FishMixin.KM_TO_MILE;
    }

    set speed(speed) {
      this._speed = speed;
    }

    set speedMiles(speed) {
      this.speed = speed / FishMixin.KM_TO_MILE;
    }

    swim() {
      return `${this.name} is swimming`;
    }
  }

  class Dolphin {

    constructor(name) {
      this.name = name;
    }

  }

  mixin(Dolphin, MammalMixin);
  mixin(Dolphin, FishMixin);

  it('mixes instance methods', () => {
    const dolphin = new Dolphin('Willy');

    expect(dolphin.breed()).to.eq('Willy is breeding');
    expect(dolphin.swim()).to.eq('Willy is swimming');
  });

  it('mixes instance properties', () => {
    const dolphin = new Dolphin('Willy');

    dolphin.speed = 20;
    expect(dolphin.speedMiles).to.eq(12.4);

    dolphin.speedMiles = 5;
    expect(dolphin.speed).to.eq(8.064516129032258);
  });

  it('mixes static methods', () => {
    expect(Dolphin.environment).to.eq('sea');
  });

});
