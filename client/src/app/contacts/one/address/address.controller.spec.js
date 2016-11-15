import appContactsModule from '../../contacts.module';
import { expect } from 'chai';
import { name } from './address.state';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe(`controller: ${name}`, () => {

    let ctrl;

    beforeEach(inject(($controller, $state, Contact) => {
      const Controller = $state.get(name).controller;

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
