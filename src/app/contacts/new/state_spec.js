import { expect } from 'chai';
import module from '../module';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('state: contacts.new', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.new');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/contacts/new');
    }));

    it('resolves `contact`', inject(($rootScope, $state, Contact) => {
      // When
      $state.go(state);
      $rootScope.$digest();

      // Then
      const { contact } = $state.$current.locals.globals;
      expect(contact).to.be.an.instanceOf(Contact);
    }));

  });

});
