import { expect } from 'chai';
import module from '../module';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('controller: contacts.show', () => {

    let ctrl;

    beforeEach(inject(($controller, $state) => {
      const Controller = $state.get('contacts.show').controller;

      ctrl = $controller(Controller, {
        contact: { id: 2, name: 'bar' }
      });
    }));

    it('has a contact', () => {
      expect(ctrl.contact).to.have.property('id', 2);
      expect(ctrl.contact).to.have.property('name', 'bar');
    });

  });

});
