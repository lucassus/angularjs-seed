import { expect } from 'chai';
import module from '../../module';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('state: home', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('home');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/');
    }));

  });

});
