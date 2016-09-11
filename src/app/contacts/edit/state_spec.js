import { expect } from 'chai';
import module from '../module';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('state: contacts.show', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.edit');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state, { id: 124 })).to.eq('#/contacts/124/edit');
    }));

    it('resolves `contacts`', inject(($httpBackend, $state) => {
      // Given
      $httpBackend
        .expectGET('/api/contacts/124')
        .respond(200, { id: 124, name: 'baz' });

      // When
      $state.go(state, { id: 124 });
      $httpBackend.flush();

      // Then
      const { contact } = $state.$current.locals.globals;
      expect(contact).to.have.property('id', 124);
      expect(contact).to.have.property('name', 'baz');
    }));

  });

});
