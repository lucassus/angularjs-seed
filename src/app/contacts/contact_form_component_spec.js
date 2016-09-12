import { expect } from 'chai';
import module from './module';
import sinon from 'sinon';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('component: contactForm', () => {

    let element, scope;

    beforeEach(inject(($compile, $rootScope, Contact) => {
      scope = $rootScope.$new();
      scope.contact = new Contact({ id: 123, firstName: 'Foo' });
      scope.update = sinon.stub();

      element = angular.element(`
        <contact-form contact="contact" 
                      on-submit="update(contact)"></contact-form>
      `);

      $compile(element)(scope);
      $rootScope.$digest();
    }));

    describe('controller', () => {

      let ctrl;

      beforeEach(() => {
        ctrl = element.controller('contactForm');
      });

      it('initializes a contact copy', () => {
        expect(ctrl.originalContact).to.not.be.undefined;
        expect(ctrl.contact).to.not.be.undefined;

        expect(ctrl.contact).to.not.eq(ctrl.originalContact);
        expect(ctrl.contact.id).to.eq(ctrl.originalContact.id);
      });

      describe('.submit', () => {

        it('updates a contact', () => {
          ctrl.submit();
          expect(scope.update.calledWith(ctrl.contact)).to.be.true;
        });

      });

    });

  });

});
