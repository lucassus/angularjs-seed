import appContactsModule from '../../contacts.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe('contacts.one', () => {

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
          expect(Contact.get.calledWith({ id: 3 })).to.be.true;

          expect(contact).to.be.instanceOf(Contact);
          expect(contact).to.have.property('id', 3);
          expect(contact).to.have.property('name', 'baz');

          done();
        });

        $rootScope.$digest();
      });
    });

  });

});
