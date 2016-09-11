import { expect } from 'chai';
import module from '../module';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('state: contacts.list', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.list');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/contacts');
    }));

    it('resolves `contacts`', inject(($rootScope, $state) => {
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
