import angular from 'angular';
import { expect } from 'chai';
import module from '../module';
import sinon from 'sinon';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('controller: contacts.new', () => {

    let $httpBackend, $state, ctrl;

    beforeEach(inject(($controller, $injector) => {
      $httpBackend = $injector.get('$httpBackend');
      $state = $injector.get('$state');

      const Controller = $state.get('contacts.new').controller;

      ctrl = $controller(Controller);
    }));

    it('has a contact', () => {
      expect(ctrl.contact).to.be.an.object;
    });

    describe('.create', () => {

      it('deletes a contact and redirect to the list page', (done) => {
        // Given
        const data = {
          firstName: 'Lukasz',
          lastName: 'Bandzarewicz'
        };

        $httpBackend
          .expectPOST('/api/contacts', data)
          .respond(200, angular.extend({}, data, { id: 125 }));

        sinon.stub($state, 'go');
        angular.extend(ctrl.contact, data);

        // When
        ctrl.create().then(() => {
          expect($state.go.calledWith('contacts.show', { id: 125 })).to.be.true;
          done();
        });

        $httpBackend.flush();
      });

    });

  });

});
