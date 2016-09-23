import { expect } from 'chai';
import module from '../../module';

describe(`module: ${module}`, () => {

  beforeEach(() => {
    angular.mock.module(module);
  });

  describe('state: contacts.show', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.show');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state, { id: 123 })).to.eq('#/contacts/123');
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
