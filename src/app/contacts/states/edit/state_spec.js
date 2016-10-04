import appContactsModule from '../../contacts.module';
import { expect } from 'chai';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe('state: contacts.show', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.edit');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state, { id: 124 })).to.eq('#/contacts/124/edit');
    }));

    it('resolves `contacts`', (done) => {
      inject(($httpBackend, $resolve) => {
        $httpBackend
          .expectGET('/api/contacts/124')
          .respond(200, { id: 124, name: 'baz' });

        const $stateParams = { id: 124 };

        $resolve.resolve(state.resolve, { $stateParams }).then(({ contact }) => {
          expect(contact).to.have.property('id', 124);
          expect(contact).to.have.property('name', 'baz');

          done();
        });

        $httpBackend.flush();
      });
    });

  });

});
