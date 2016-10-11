import appContactsModule from '../../contacts.module';
import { expect } from 'chai';
import { name } from './show.state';
import sinon from 'sinon';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(angular.mock.module(appContactsModule));

  describe(`controller: ${name}`, () => {

    let ctrl;

    beforeEach(inject(($controller, $state, toastr, Contact) => {
      const Controller = $state.get(name).controller;

      ctrl = $controller(Controller, {
        $state: { go: sinon.stub() },
        toastr: sinon.stub(toastr),
        confirm: sinon.stub().returns(true),

        contact: new Contact({ id: 2, firstName: 'Anakin', lastName: 'Skywalker' })
      });
    }));

    it('has a contact', () => {
      expect(ctrl.contact).to.have.property('id', 2);
      expect(ctrl.contact).to.have.property('firstName', 'Anakin');
      expect(ctrl.contact).to.have.property('lastName', 'Skywalker');
    });

    describe('.delete', () => {

      it('displays a confirmation', () => {
        // When
        ctrl.delete();

        // Then
        const message = 'Do you rally want to delete contact Anakin Skywalker?';
        expect(ctrl.confirm.calledWith(message)).to.be.true;
      });

      describe('when confirmed', () => {

        beforeEach(() => {
          ctrl.confirm.returns(true);
        });

        describe('on success', () => {

          beforeEach(inject(($q, $rootScope) => {
            // Given
            sinon.stub(ctrl.contact, '$delete')
              .returns($q.resolve());

            // When
            ctrl.delete();
            $rootScope.$digest();
          }));

          it('displays a notification', () => {
            expect(ctrl.toastr.success.calledWith('Contact deleted')).to.be.true;
          });

          it('redirect to the list page', () => {
            expect(ctrl.$state.go.calledWith('contacts.list')).to.be.true;
          });

        });

        describe('on error', () => {

          beforeEach(inject(($q, $rootScope) => {
            // Given
            sinon.stub(ctrl.contact, '$delete')
              .returns($q.reject());

            // When
            ctrl.delete();
            $rootScope.$digest();
          }));

          it('does not redirect', () => {
            expect(ctrl.$state.go.calledWith('contacts.list')).to.be.false;
          });

        });

      });

      describe('when not confirmed', () => {

        beforeEach(() => {
          ctrl.confirm.returns(false);
          ctrl.delete();
        });

        it('does nothing', () => {
          expect(ctrl.$state.go.called).to.be.false;
        });

      });

    });

  });

});
