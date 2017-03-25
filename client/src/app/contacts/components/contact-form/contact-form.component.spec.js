import assert from 'assert';
import componentsModule from '../components.module';
import sinon from 'sinon';

describe(`module ${componentsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(componentsModule);
  });

  describe('component `appContactForm`', () => {

    let element, scope;

    beforeEach(inject(($compile, $rootScope, $q, Contact) => {
      scope = $rootScope.$new();
      scope.contact = new Contact({ id: 123, firstName: 'Foo' });
      scope.update = sinon.stub().returns($q.resolve({}));

      element = angular.element(`
        <app-contact-form 
          contact="contact" 
          on-submit="update(contact)"></app-contact-form>
      `);

      $compile(element)(scope);
      $rootScope.$digest();
    }));

    describe('controller', () => {

      let ctrl;

      beforeEach(() => {
        ctrl = element.controller('appContactForm');
      });

      it('initializes a contact copy', () => {
        assert.notEqual(ctrl.originalContact, undefined);
        assert(ctrl.contact);

        assert.notEqual(ctrl.contact, ctrl.originalConcontact);
        assert.equal(ctrl.contact.id, ctrl.originalContact.id);
      });

      describe('.showError', () => {

        describe('when the form is not dirty', () => {

          it('returns false', () => {
            assert(!ctrl.showError({ $dirty: false }));
          });

        });

        describe('when the form is dirty', () => {

          describe('when the field has an error', () => {

            it('returns true', () => {
              const form = { $dirty: true, foo: { $invalid: true } };
              assert(ctrl.showError(form, 'foo'));
            });

          });

          describe('when the field does not have an error', () => {

            it('returns false', () => {
              const form = { $dirty: true, foo: { $invalid: false } };
              assert(!ctrl.showError(form, 'foo'));
            });

          });

        });

      });

      describe('.isPersisted', () => {

        it('returns true for a contacts with `id`', () => {
          angular.extend(ctrl.contact, { id: 123 });
          assert(ctrl.isPersisted());
        });

        it('returns false for a contact without `id`', () => {
          angular.extend(ctrl.contact, { id: null });
          assert(!ctrl.isPersisted());
        });

      });

      describe('.submit', () => {

        it('updates a contact', () => {
          ctrl.submit();
          assert(scope.update.calledWith(ctrl.contact));
        });

        it('toggles `saving` flag', inject(($rootScope) => {
          // Given
          assert(!ctrl.saving);

          // When
          ctrl.submit();

          // Then
          assert(ctrl.saving);

          // ...resolve the promise
          $rootScope.$digest();
          assert(!ctrl.saving);
        }));

      });

    });

  });

});
