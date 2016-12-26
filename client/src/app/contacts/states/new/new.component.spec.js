import assert from 'assert';
import { isPromise } from '../../../../specs/utils';
import sinon from 'sinon';
import statesModule from '../states.module';

describe(`module ${statesModule}`, () => {

  beforeEach(angular.mock.module(statesModule));

  describe('state `contacts.new` component', () => {

    let ctrl;

    beforeEach(inject(($componentController, $state, toastr) => {
      const state = $state.get('contacts.new');

      ctrl = $componentController(state.component, {
        $state: { go: sinon.stub() },
        toastr: sinon.stub(toastr)
      });
    }));

    it('has a contact', inject((Contact) => {
      assert(ctrl.contact instanceof Contact);
    }));

    describe('.create', () => {

      let contact;

      beforeEach(inject((Contact) => {
        contact = new Contact({ firstName: 'Luke' });
      }));

      it('returns a promise', () => {
        assert(isPromise(ctrl.create(contact)));
      });

      describe('on success', () => {

        beforeEach(inject(($q, $rootScope) => {
          // Given
          sinon.stub(contact, '$create').callsFake(function() {
            angular.extend(this, { id: 123, createdAt: new Date() });
            return $q.resolve(this);
          });

          // When
          ctrl.create(contact);
          $rootScope.$digest();
        }));

        it('creates a contact', () => {
          assert.equal(ctrl.contact.id, 123);
          assert.equal(ctrl.contact.firstName, 'Luke');
          assert(ctrl.contact.createdAt);
        });

        it('displays a notification', () => {
          assert(ctrl.toastr.success.calledWith('Contact created'));
        });

        it('redirects to the show page', () => {
          assert(ctrl.$state.go.calledWith('contacts.one.show'));
        });

      });

      describe('on error', () => {

        beforeEach(inject(($q, $rootScope) => {
          // Given
          sinon.stub(contact, '$create').callsFake(() => {
            return $q.reject();
          });

          // When
          ctrl.create(contact);
          $rootScope.$digest();
        }));

        it('does not create a contact', () => {
          assert(!ctrl.contact.id);
        });

        it('does not redirect', () => {
          assert(!ctrl.$state.go.calledWith('contacts.one.show'));
        });

        it('displays an error notification', () => {
          assert(ctrl.toastr.error.calledWith('Unable to create a contact.'));
        });

      });

    });

  });

});
