import { expect } from 'chai';
import module from '../module';
import sinon from 'sinon';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name, ($provide) => {
      $provide.service('contactsRepository', ($q) => {
        return {
          find: sinon.stub().withArgs(3).returns($q.resolve({
            id: 3,
            name: 'baz'
          }))
        }
      });
    });
  });

  describe('state: contacts.show', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.show');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state, { id: 123 })).to.eq('#/contacts/123');
    }));

    it('resolves `contacts`', inject(($rootScope, $state, contactsRepository) => {
      // When
      $state.go(state, { id: 3 });
      $rootScope.$digest();

      // Then
      expect(contactsRepository.find.calledWith(3)).to.be.true;

      const { contact } = $state.$current.locals.globals;
      expect(contact).to.have.property('id', 3);
      expect(contact).to.have.property('name', 'baz');
    }));

  });

});
