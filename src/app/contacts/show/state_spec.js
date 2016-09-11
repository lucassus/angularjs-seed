import { expect } from 'chai';
import module from '../module';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('state: contacts.show', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.show');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state, { id: 123 })).to.eq('#/contacts/123');
    }));

    it('resolves `contacts`', inject(($httpBackend, $state) => {
      // Given
      $httpBackend
        .expectGET('/api/contacts/3')
        .respond(200, { id: 3, name: 'baz' });

      // When
      $state.go(state, { id: 3 });
      $httpBackend.flush();

      // Then
      const { contact } = $state.$current.locals.globals;
      expect(contact).to.have.property('id', 3);
      expect(contact).to.have.property('name', 'baz');
    }));

  });

});
