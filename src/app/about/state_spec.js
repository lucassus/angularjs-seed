import appModule from '../../app';
import { expect } from 'chai';

describe('module: app', () => {

  beforeEach(() => {
    angular.mock.module(appModule.name);
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
