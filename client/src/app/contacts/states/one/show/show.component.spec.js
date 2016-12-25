import { expect } from 'chai';
import sinon from 'sinon';
import statesModule from '../../states.module';

describe(`module ${statesModule}`, () => {

  beforeEach(angular.mock.module(statesModule));

  describe('state `contacts.one.show` component', () => {

    let ctrl;

    beforeEach(inject(($componentController, $state, Contact, confirmation, toastr) => {
      const state = $state.get('contacts.one.show');

      const contact = new Contact({
        id: 2,
        firstName: 'Anakin',
        lastName: 'Skywalker'
      });

      sinon.stub($state, 'go');
      sinon.stub(confirmation, 'show').returns(true);

      ctrl = $componentController(state.component, {
        $state,
        confirmation,
        toastr: sinon.stub(toastr)
      }, {
        contact
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
        expect(ctrl.confirmation.show.calledWith(message)).to.be.true;
      });

      describe('when confirmed', () => {

        beforeEach(() => {
          ctrl.confirmation.show.returns(true);
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

          it('displays an error notification', () => {
            expect(ctrl.toastr.error.calledWith('Unable to delete a contact.'))
              .to.be.true;
          });

        });

      });

      describe('when not confirmed', () => {

        beforeEach(() => {
          ctrl.confirmation.show.returns(false);
          ctrl.delete();
        });

        it('does nothing', () => {
          expect(ctrl.$state.go.called).to.be.false;
        });

      });

    });

  });

});
