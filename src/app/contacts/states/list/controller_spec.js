import { expect } from 'chai';
import module from '../../module';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('controller: contacts.list', () => {

    let ctrl;

    beforeEach(inject(($controller, $state) => {
      const Controller = $state.get('contacts.list').controller;

      ctrl = $controller(Controller, {
        contacts: [
          { id: 1, firstName: 'Karen' },
          { id: 2, firstName: 'Luke' }
        ]
      });
    }));

    it('has an array of contacts', () => {
      expect(ctrl.contacts).to.be.an.array;
      expect(ctrl.contacts).to.have.length(2);

      expect(ctrl.contacts[0]).to.have.property('id', 1);
      expect(ctrl.contacts[0]).to.have.property('firstName', 'Karen');

      expect(ctrl.contacts[1]).to.have.property('id', 2);
      expect(ctrl.contacts[1]).to.have.property('firstName', 'Luke');
    });

  });

});
