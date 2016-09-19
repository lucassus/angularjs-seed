import { expect } from 'chai';
import module from '../../module';

describe(`module: ${module}`, () => {

  beforeEach(() => {
    angular.mock.module(module);
  });

  describe('state: contacts.list', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.list');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/contacts/');
    }));

    it('resolves `contacts`', (done) => {
      inject(($httpBackend, $resolve) => {
        $httpBackend
          .expectGET('/api/contacts')
          .respond(200, {
            contacts: [
              { id: 10, name: 'foo' },
              { id: 11, name: 'bar' }
            ]});

        $resolve.resolve(state.resolve).then(({ contacts }) => {
          expect(contacts).to.be.an.array;
          expect(contacts).to.have.length(2);
          expect(contacts[0]).to.have.property('id', 10);
          expect(contacts[1]).to.have.property('id', 11);

          done();
        });

        $httpBackend.flush();
      });
    });

  });

});
