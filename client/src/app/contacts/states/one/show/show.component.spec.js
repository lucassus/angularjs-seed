import assert from 'assert';
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
      assert.equal(ctrl.contact.id, 2);
      assert.equal(ctrl.contact.firstName, 'Anakin');
      assert.equal(ctrl.contact.lastName, 'Skywalker');
    });

    describe('.delete', () => {

      it('displays a confirmation', () => {
        // When
        ctrl.delete();

        // Then
        const message = 'Do you rally want to delete contact Anakin Skywalker?';
        assert(ctrl.confirmation.show.calledWith(message));
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
            assert(ctrl.toastr.success.calledWith('Contact deleted'));
          });

          it('redirect to the list page', () => {
            assert(ctrl.$state.go.calledWith('contacts.list'));
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
            assert(!ctrl.$state.go.calledWith('contacts.list'));
          });

          it('displays an error notification', () => {
            assert(ctrl.toastr.error.calledWith('Unable to delete a contact.'));
          });

        });

      });

      describe('when not confirmed', () => {

        beforeEach(() => {
          ctrl.confirmation.show.returns(false);
          ctrl.delete();
        });

        it('does nothing', () => {
          assert(!ctrl.$state.go.called);
        });

      });

    });

  });

});
