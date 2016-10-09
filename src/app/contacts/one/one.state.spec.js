import appContactsModule from '../contacts.module';
import { expect } from 'chai';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  const stateName = 'contacts.one';

  describe(`state: ${stateName}`, () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get(stateName);
    }));

    it('resolves `contact`', (done) => {
      inject(($httpBackend, $resolve) => {
        $httpBackend
          .expectGET('/api/contacts/3')
          .respond(200, { id: 3, name: 'baz' });

        const $stateParams = { id: 3 };

        $resolve.resolve(state.resolve, { $stateParams }).then(({ contact }) => {
          expect(contact).to.have.property('id', 3);
          expect(contact).to.have.property('name', 'baz');

          done();
        });

        $httpBackend.flush();
      });
    });

  });

});
