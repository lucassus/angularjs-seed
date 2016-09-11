import { expect } from 'chai';
import module from '../module';
import sinon from 'sinon';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('controller: contacts.edit', () => {

    let $httpBackend, $state, ctrl;

    beforeEach(inject(($controller, $injector) => {
      $httpBackend = $injector.get('$httpBackend');
      $state = $injector.get('$state');

      const Controller = $state.get('contacts.edit').controller;

      ctrl = $controller(Controller, {
        contact: { id: 2, name: 'bar' }
      });
    }));

    it('has a contact', () => {
      expect(ctrl.contact).to.have.property('id', 2);
      expect(ctrl.contact).to.have.property('name', 'bar');
    });

    describe('.update', () => {

      it('deletes a contact and redirect to the list page', (done) => {
        $httpBackend.expectPUT('/api/contacts/2').respond(200);
        sinon.stub($state, 'go');

        ctrl.update().then(() => {
          expect($state.go.calledWith('contacts.show', { id: 2 })).to.be.true;
          done();
        });

        $httpBackend.flush();
      });

    });

  });

});
