import { expect } from 'chai';
import module from '../module';
import sinon from 'sinon';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name, ($provide) => {
      $provide.service('contactsRepository', ($q) => {
        return {
          all: sinon.stub().returns($q.resolve([
            { id: 10, name: 'foo' },
            { id: 11, name: 'bar' },
          ]))
        }
      })
    });
  });

  describe('state: contacts.list', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.list');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/contacts');
    }));

    it('resolves `contacts`', inject(($rootScope, $state, contactsRepository) => {
      // When
      $state.go(state);
      $rootScope.$digest();

      // Then
      expect(contactsRepository.all.called).to.be.true;

      const { contacts } = $state.$current.locals.globals;
      expect(contacts).to.be.an.array;
      expect(contacts).to.have.length(2);
      expect(contacts[0]).to.have.property('id', 10);
      expect(contacts[1]).to.have.property('id', 11);
    }));

  });

});
