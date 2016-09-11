import { expect } from 'chai';
import module from '../module';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('controller: contacts', () => {

    let ctrl;

    beforeEach(inject(($controller, $state) => {
      const Controller = $state.get('contacts.list').controller;

      ctrl = $controller(Controller, {
        contacts: [
          { id: 1, name: 'foo' },
          { id: 2, name: 'bar' }
        ]
      });
    }));

    it('has an array of contacts', () => {
      expect(ctrl.contacts).to.be.an.array;
      expect(ctrl.contacts).to.have.length(2);
      expect(ctrl.contacts[0]).to.have.property('id', 1);
      expect(ctrl.contacts[0]).to.have.property('name', 'foo');
      expect(ctrl.contacts[1]).to.have.property('id', 2);
      expect(ctrl.contacts[1]).to.have.property('name', 'bar');
    });

  });

});
