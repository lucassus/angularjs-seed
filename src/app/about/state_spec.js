import appModule from '../../app';
import { expect } from 'chai';

describe('module: app', () => {

  beforeEach(() => {
    angular.mock.module(appModule.name);
  });

  describe('state: about', () => {

    let state;

    beforeEach(angular.mock.inject(($state) => {
      state = $state.get('about');
    }));

    it('has valid url', angular.mock.inject(($state) => {
      expect($state.href(state)).to.eq('#/about');
    }));

  });

});
