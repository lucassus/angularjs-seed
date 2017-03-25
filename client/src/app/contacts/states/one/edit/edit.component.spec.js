import assert from 'assert';
import { isPromise } from '../../../../../specs/utils';
import sinon from 'sinon';
import statesModule from '../../states.module';

describe(`module ${statesModule}`, () => {

  beforeEach(angular.mock.module(statesModule));

  describe('state `contacts.one.edit` component', () => {

    let ctrl;

    beforeEach(inject(($componentController, $state, toastr, Contact) => {
      const state = $state.get('contacts.one.edit');

      const contact = new Contact({
        id: 123,
        firstName: 'Anakin'
      });

      ctrl = $componentController(state.component, {
        $state: { go: sinon.stub() },
        toastr: sinon.stub(toastr)
      }, {
        contact
      });
    }));

    it('has a contact', () => {
      assert.equal(ctrl.contact.id, 123);
      assert.equal(ctrl.contact.firstName, 'Anakin');
    });

    describe('.update', () => {

      let contact;

      beforeEach(() => {
        contact = angular.copy(ctrl.contact);
        angular.extend(contact, { firstName: 'Luke' });
      });

      it('returns a promise', () => {
        assert(isPromise(ctrl.update(contact)));
      });

      describe('on success', () => {

        beforeEach(inject(($q, $rootScope) => {
          // Given
          sinon.stub(contact, '$update').callsFake(function() {
            angular.extend(this, { updatedAt: new Date() });
            return $q.resolve(this);
          });

          // When
          ctrl.update(contact);
          $rootScope.$digest();
        }));

        it('updates a contact', () => {
          assert.equal(ctrl.contact.id, 123);
          assert.equal(ctrl.contact.firstName, 'Luke');
          assert(ctrl.contact.updatedAt);
        });

        it('displays a notification', () => {
          assert(ctrl.toastr.success.calledWith('Contact updated'));
        });

        it('redirects to the show page', () => {
          assert(ctrl.$state.go.calledWith('contacts.one.show', { id: 123 }));
        });

      });

      describe('on error', () => {

        beforeEach(inject(($q, $rootScope) => {
          // Given
          sinon.stub(contact, '$update').callsFake(() => {
            return $q.reject();
          });

          // When
          ctrl.update(contact);
          $rootScope.$digest();
        }));

        it('does not update a contact', () => {
          assert.equal(ctrl.contact.firstName, 'Anakin');
          assert(!ctrl.contact.createdAt);
        });

        it('does not redirect', () => {
          assert(!ctrl.$state.go.calledWith('contacts.one.show'));
        });

        it('displays an error notification', () => {
          assert(ctrl.toastr.error.calledWith('Unable to update a contact.'));
        });

      });

    });

  });

});
