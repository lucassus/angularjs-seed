import appContactsModule from '../../contacts.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe('state `contacts.list`', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.list');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.equal('#!/contacts');
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
          expect(contacts).to.be.an('array');
          expect(contacts).to.have.length(2);

          expect(contacts[0]).to.be.instanceOf(Contact);
          expect(contacts[0]).to.have.property('id', 10);
          expect(contacts[0]).to.have.property('firstName', 'Anakin');

          expect(contacts[1]).to.be.instanceOf(Contact);
          expect(contacts[1]).to.have.property('id', 11);
          expect(contacts[1]).to.have.property('firstName', 'Luke');

          done();
        });

        $rootScope.$digest();
      });
    });

  });

});
