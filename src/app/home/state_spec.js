import appModule from '../../app';
import { expect } from 'chai';

describe('module: app', () => {

  beforeEach(() => {
    angular.mock.module(appModule.name);
  });

  describe('state: home', () => {

    let state;

    beforeEach(angular.mock.inject(($state) => {
      state = $state.get('home');
    }));

    it('has valid url', angular.mock.inject(($state) => {
      expect($state.href(state)).to.eq('#/');
    }));

  });

});
