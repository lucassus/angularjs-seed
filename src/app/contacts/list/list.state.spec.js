import appContactsModule from '../contacts.module';
import { expect } from 'chai';
import { name } from './list.state';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe(`state: ${name}`, () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get(name);
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/contacts');
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
