import appContactsModule from '../contacts.module';
import { expect } from 'chai';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe('controller: contacts.list', () => {

    let ctrl;

    beforeEach(inject(($controller, $state, Contact) => {
      const Controller = $state.get('contacts.list').controller;

      ctrl = $controller(Controller, {
        contacts: [
          new Contact({ id: 1, firstName: 'Karen' }),
          new Contact({ id: 2, firstName: 'Luke' })
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
