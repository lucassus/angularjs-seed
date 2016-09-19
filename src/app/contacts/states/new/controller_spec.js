import angular from 'angular';
import { expect } from 'chai';
import module from '../../module';
import sinon from 'sinon';

describe(`module: ${module}`, () => {

  beforeEach(() => {
    angular.mock.module(module);
  });

  describe('controller: contacts.new', () => {

    let ctrl;

    beforeEach(inject(($controller, $state, Contact) => {
      const { controller } = $state.get('contacts.new');

      ctrl = $controller(controller, {
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
