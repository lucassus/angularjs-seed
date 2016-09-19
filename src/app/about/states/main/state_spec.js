import { expect } from 'chai';
import module from '../../module';

describe(`module: ${module}`, () => {

  beforeEach(() => {
    angular.mock.module(module);
  });

  describe('state: about', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('about');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/about');
    }));

  });

});
