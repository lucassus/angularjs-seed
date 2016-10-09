import appContactsModule from '../../../contacts.module';
import { expect } from 'chai';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  const stateName = 'contacts.one.address.edit';

  describe(`controller: ${stateName}`, () => {

    let ctrl;

    beforeEach(inject(($controller, $state, Contact) => {
      const Controller = $state.get(stateName).controller;

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
