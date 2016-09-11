import appModule from '../../app';
import { expect } from 'chai';

describe('module: app', () => {

  beforeEach(() => {
    angular.mock.module(appModule.name);
  });

  describe('state: contacts', () => {

    let state;

    beforeEach(angular.mock.inject(($state) => {
      state = $state.get('contacts');
    }));

    it('has valid url', angular.mock.inject(($state) => {
      expect($state.href(state)).to.eq('#/contacts');
    }));

    it('resolves `contacts`', angular.mock.inject(($rootScope, $state) => {
      // When
      $state.go(state);
      $rootScope.$digest();

      // Then
      const { contacts } = $state.$current.locals.globals;
      expect(contacts).to.be.an.array;
      expect(contacts).to.have.length(2);
    }));

  });

});
