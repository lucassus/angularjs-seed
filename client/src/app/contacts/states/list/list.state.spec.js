import assert from 'assert';
import sinon from 'sinon';
import statesModule from '../states.module';

describe(`module ${statesModule}`, () => {

  beforeEach(() => {
    angular.mock.module(statesModule);
  });

  describe('state `contacts.list`', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.list');
    }));

    it('has valid url', inject(($state) => {
      assert.equal($state.href(state), '#!/contacts');
    }));

    it('resolves `contacts`', (done) => {
      inject(($q, $resolve, $rootScope, Contact) => {
        // Given
        const $promise = $q.resolve([
          new Contact({ id: 10, firstName: 'Anakin' }),
          new Contact({ id: 11, firstName: 'Luke' })
        ]);

        sinon.stub(Contact, 'query').returns({ $promise });

        // When
        $resolve.resolve(state.resolve).then(({ contacts }) => {
          assert(contacts instanceof Array);
          assert.equal(contacts.length, 2);

          assert(contacts[0] instanceof Contact);
          assert.equal(contacts[0].id, 10);
          assert.equal(contacts[0].firstName, 'Anakin');

          assert(contacts[1] instanceof Contact);
          assert.equal(contacts[1].id, 11);
          assert.equal(contacts[1].firstName, 'Luke');

          done();
        });

        $rootScope.$digest();
      });
    });

  });

});
