import appContactsModule from '../contacts.module';
import { expect } from 'chai';
import { name } from './new.state';
import sinon from 'sinon';
import toastrMockModule from '../../../specs/toastr-mock.module';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
    angular.mock.module(toastrMockModule);
  });

  describe(`controller: ${name}`, () => {

    let ctrl;

    beforeEach(inject(($controller, $state, Contact) => {
      const Controller = $state.get(name).controller;

      ctrl = $controller(Controller, {
        contact: new Contact()
      });
    }));

    it('has a contact', inject((Contact) => {
      expect(ctrl.contact).to.be.an.instanceOf(Contact);
    }));

    describe('.create', () => {

      let requestHandler;

      beforeEach(inject(($httpBackend, $state) => {
        // Given
        const contactCopy = angular.copy(ctrl.contact);
        angular.extend(contactCopy, {
          firstName: 'Lukasz',
          lastName: 'Bandzarewicz'
        });

        requestHandler = $httpBackend
          .expectPOST('/api/contacts', contactCopy);

        sinon.spy(ctrl.contact, '$create');
        sinon.stub($state, 'go');

        // When
        const promise = ctrl.create(contactCopy);

        // Then
        expect(typeof promise.then).to.be.eq('function');
        expect(typeof promise.finally).to.be.eq('function');
      }));

      describe('on success', () => {

        beforeEach(inject(($httpBackend) => {
          requestHandler.respond(200, { id: 125 });
          $httpBackend.flush();
        }));

        it('displays a notification', inject((toastr) => {
          expect(toastr.success.calledWith('Contact created')).to.be.true;
        }));

        it('creates a contact', () => {
          expect(ctrl.contact).to.have.property('id', 125);
        });

        it('redirects to the show page', inject(($state) => {
          expect($state.go.calledWith('contacts.show', { id: 125 })).to.be.true;
        }));

      });

      describe('on error', () => {

        beforeEach(inject(($httpBackend) => {
          requestHandler.respond(422);
          $httpBackend.flush();
        }));

        it('does not redirect to the show page', inject(($state) => {
          expect($state.go.calledWith('contacts.show')).to.be.false;
        }));

      });

    });

  });

});
