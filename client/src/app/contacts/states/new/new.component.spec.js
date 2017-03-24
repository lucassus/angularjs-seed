import { expect } from 'chai';
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
      expect(ctrl.contact).to.be.an.instanceOf(Contact);
    }));

    describe('.create', () => {

      let contact;

      beforeEach(inject((Contact) => {
        contact = new Contact({ firstName: 'Luke' });
      }));

      it('returns a promise', () => {
        expect(ctrl.create(contact)).to.be.a.promise;
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
          expect(ctrl.contact).to.have.property('id', 123);
          expect(ctrl.contact).to.have.property('firstName', 'Luke');
          expect(ctrl.contact).to.have.property('createdAt');
        });

        it('displays a notification', () => {
          expect(ctrl.toastr.success.calledWith('Contact created')).to.be.true;
        });

        it('redirects to the show page', () => {
          expect(ctrl.$state.go.calledWith('contacts.one.show')).to.be.true;
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
          expect(ctrl.contact).to.not.have.property('id');
        });

        it('does not redirect', () => {
          expect(ctrl.$state.go.calledWith('contacts.one.show')).to.be.false;
        });

        it('displays an error notification', () => {
          expect(ctrl.toastr.error.calledWith('Unable to create a contact.'))
            .to.be.true;
        });

      });

    });

  });

});
