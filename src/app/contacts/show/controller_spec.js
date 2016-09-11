import { expect } from 'chai';
import module from '../module';
import sinon from 'sinon';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('controller: contacts.show', () => {

    let $httpBackend, $state, ctrl;

    beforeEach(inject(($controller, $injector) => {
      $httpBackend = $injector.get('$httpBackend');
      $state = $injector.get('$state');

      const Controller = $state.get('contacts.show').controller;

      ctrl = $controller(Controller, {
        contact: { id: 2, name: 'bar' }
      });
    }));

    it('has a contact', () => {
      expect(ctrl.contact).to.have.property('id', 2);
      expect(ctrl.contact).to.have.property('name', 'bar');
    });

    describe('.delete', () => {

      it('deletes a contact and redirect to the list page', (done) => {
        // Given
        $httpBackend.expectDELETE('/api/contacts/2').respond(200);
        sinon.stub($state, 'go');

        // When
        ctrl.delete().then(() => done());
        $httpBackend.flush();

        // Then
        expect($state.go.calledWith('contacts.list')).to.be.true;
      });

    });

  });

});
