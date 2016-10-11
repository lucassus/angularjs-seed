import appContactsModule from '../../contacts.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(angular.mock.module(appContactsModule));

  const stateName = 'contacts.one.edit';

  describe(`controller: ${stateName}`, () => {

    let ctrl;

    beforeEach(inject(($controller, $state, toastr, Contact) => {
      const Controller = $state.get(stateName).controller;

      ctrl = $controller(Controller, {
        $state: { go: sinon.stub() },
        toastr: sinon.stub(toastr),
        contact: new Contact({ id: 2, firstName: 'Mark' })
      });
    }));

    it('has a contact', () => {
      expect(ctrl.contact).to.have.property('id', 2);
      expect(ctrl.contact).to.have.property('firstName', 'Mark');
    });

    describe('.update', () => {

      let requestHandler;

      beforeEach(inject(($httpBackend) => {
        // Given
        const contactCopy = angular.copy(ctrl.contact);
        angular.extend(contactCopy, {
          firstName: 'Lukasz',
          lastName: 'Bandzarewicz'
        });

        requestHandler = $httpBackend
          .expectPUT('/api/contacts/2', contactCopy);

        sinon.spy(ctrl.contact, '$update');

        // When
        const promise = ctrl.update(contactCopy);

        // Then
        expect(promise).to.be.a.promise;
      }));

      describe('on success', () => {

        beforeEach(inject(($httpBackend) => {
          requestHandler.respond(200);
          $httpBackend.flush();
        }));

        it('displays a notification', () => {
          expect(ctrl.toastr.success.calledWith('Contact updated')).to.be.true;
        });

        it('updates a contact', () => {
          expect(ctrl.contact).to.have.property('id', 2);
          expect(ctrl.contact).to.have.property('firstName', 'Lukasz');
          expect(ctrl.contact).to.have.property('lastName', 'Bandzarewicz');
        });

        it('redirects to the list page', () => {
          expect(ctrl.$state.go.calledWith('contacts.show', { id: 2 })).to.be.true;
        });

      });

      describe('on error', () => {

        beforeEach(inject(($httpBackend) => {
          requestHandler.respond(422);
          $httpBackend.flush();
        }));

        it('does not redirect', () => {
          expect(ctrl.$state.go.calledWith('contacts.show')).to.be.false;
        });

      });

    });

  });

});
