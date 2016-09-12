import angular from 'angular';
import { expect } from 'chai';
import module from '../../module';
import sinon from 'sinon';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('controller: contacts.edit', () => {

    let ctrl;

    beforeEach(inject(($controller, $state, Contact) => {
      const { controller } = $state.get('contacts.edit');

      ctrl = $controller(controller, {
        contact: new Contact({ id: 2, firstName: 'Mark' })
      });
    }));

    it('has a contact', () => {
      expect(ctrl.contact).to.have.property('id', 2);
      expect(ctrl.contact).to.have.property('firstName', 'Mark');
    });

    describe('.update', () => {

      let requestHandler;

      beforeEach(inject(($httpBackend, $state) => {
        const contactCopy = angular.copy(ctrl.contact);
        angular.extend(contactCopy, {
          firstName: 'Lukasz',
          lastName: 'Bandzarewicz'
        });

        requestHandler = $httpBackend
          .expectPUT('/api/contacts/2', contactCopy);

        sinon.spy(ctrl.contact, '$update');
        sinon.stub($state, 'go');

        ctrl.update(contactCopy);
      }));

      describe('on success', () => {

        beforeEach(inject(($httpBackend) => {
          requestHandler.respond(200);
          $httpBackend.flush();
        }));

        it('updates a contact', () => {
          expect(ctrl.contact).to.have.property('id', 2);
          expect(ctrl.contact).to.have.property('firstName', 'Lukasz');
          expect(ctrl.contact).to.have.property('lastName', 'Bandzarewicz');
        });

        it('redirects to the list page', inject(($state) => {
          expect($state.go.calledWith('contacts.show', { id: 2 })).to.be.true;
        }));

      });

      describe('on error', () => {

        beforeEach(inject(($httpBackend) => {
          requestHandler.respond(422);
          $httpBackend.flush();
        }));

        it('does not redirect', inject(($state) => {
          expect($state.go.calledWith('contacts.show')).to.be.false;
        }));

      });

    });

  });

});
