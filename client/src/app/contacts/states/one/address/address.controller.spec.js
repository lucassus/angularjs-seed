import appContactsModule from '../../../contacts.module';
import { expect } from 'chai';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe('address controller', () => {

    let ctrl;

    beforeEach(inject(($controller, $state, Contact) => {
      const Controller = $state.get('contacts.one.address').controller;

      ctrl = $controller(Controller, {
        contact: new Contact({ id: 2, name: 'bar' })
      });
    }));

    it('has a contact', () => {
      expect(ctrl.contact).to.have.property('id', 2);
      expect(ctrl.contact).to.have.property('name', 'bar');
    });

  });

});
