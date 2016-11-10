import appContactsModule from '../../../contacts.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(angular.mock.module(appContactsModule));

  describe('edit controller', () => {

    let ctrl;

    beforeEach(inject(($controller, $state, toastr, Contact) => {
      const Controller = $state.get('contacts.one.edit').controller;

      ctrl = $controller(Controller, {
        $state: { go: sinon.stub() },
        toastr: sinon.stub(toastr),
        contact: new Contact({ id: 123, firstName: 'Anakin' })
      });
    }));

    it('has a contact', () => {
      expect(ctrl.contact).to.have.property('id', 123);
      expect(ctrl.contact).to.have.property('firstName', 'Anakin');
    });

    describe('.update', () => {

      let contact;

      beforeEach(() => {
        contact = angular.copy(ctrl.contact);
        angular.extend(contact, { firstName: 'Luke' });
      });

      it('returns a promise', () => {
        expect(ctrl.update(contact)).to.be.a.promise;
      });

      describe('on success', () => {

        beforeEach(inject(($q, $rootScope) => {
          // Given
          sinon.stub(contact, '$update', function() {
            angular.extend(this, { updatedAt: new Date() });
            return $q.resolve(this);
          });

          // When
          ctrl.update(contact);
          $rootScope.$digest();
        }));

        it('updates a contact', () => {
          expect(ctrl.contact).to.have.property('id', 123);
          expect(ctrl.contact).to.have.property('firstName', 'Luke');
          expect(ctrl.contact).to.have.property('updatedAt');
        });

        it('displays a notification', () => {
          expect(ctrl.toastr.success.calledWith('Contact updated')).to.be.true;
        });

        it('redirects to the show page', () => {
          expect(ctrl.$state.go.calledWith('contacts.one.show', { id: 123 })).to.be.true;
        });

      });

      describe('on error', () => {

        beforeEach(inject(($q, $rootScope) => {
          // Given
          sinon.stub(contact, '$update', () => {
            return $q.reject();
          });

          // When
          ctrl.update(contact);
          $rootScope.$digest();
        }));

        it('does not update a contact', () => {
          expect(ctrl.contact).to.have.property('firstName', 'Anakin');
          expect(ctrl.contact).to.not.have.property('createdAt');
        });

        it('does not redirect', () => {
          expect(ctrl.$state.go.calledWith('contacts.one.show')).to.be.false;
        });

        it('displays an error notification', () => {
          expect(ctrl.toastr.error.calledWith('Unable to update a contact.'))
            .to.be.true;
        });

      });

    });

  });

});
