import assert from 'assert';
import sinon from 'sinon';
import statesModule from '../states.module';

describe(`module ${statesModule}`, () => {

  beforeEach(() => {
    angular.mock.module(statesModule);
  });

  describe('state `contacts.one`', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.one');
    }));

    it('resolves `contact`', (done) => {
      inject(($q, $resolve, $rootScope, Contact) => {
        // Given
        const $promise = $q.resolve(new Contact({ id: 3, name: 'baz' }));
        sinon.stub(Contact, 'get').returns({ $promise });

        const $stateParams = { id: 3 };

        // When
        $resolve.resolve(state.resolve, { $stateParams }).then(({ contact }) => {
          assert(Contact.get.calledWith({ id: 3 }));

          assert(contact instanceof Contact);
          assert.equal(contact.id, 3);
          assert.equal(contact.name, 'baz');

          done();
        });

        $rootScope.$digest();
      });
    });

  });

});
