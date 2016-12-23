import appContactsModule from '../../contacts.module';
import { expect } from 'chai';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  xdescribe('list controller', () => {

    let ctrl;

    beforeEach(inject(($componentController, $state, Contact) => {
      const componentName = $state.get('contacts.list').component;

      ctrl = $componentController(componentName, {
        contacts: [
          new Contact({ id: 1, firstName: 'Karen' }),
          new Contact({ id: 2, firstName: 'Luke' })
        ]
      });
    }));

    it('has an array of contacts', inject((Contact) => {
      expect(ctrl.contacts).to.be.an('array');
      expect(ctrl.contacts).to.have.length(2);

      expect(ctrl.contacts[0]).to.be.an.instanceOf(Contact);
      expect(ctrl.contacts[0]).to.have.property('id', 1);
      expect(ctrl.contacts[0]).to.have.property('firstName', 'Karen');

      expect(ctrl.contacts[1]).to.be.an.instanceOf(Contact);
      expect(ctrl.contacts[1]).to.have.property('id', 2);
      expect(ctrl.contacts[1]).to.have.property('firstName', 'Luke');
    }));

  });

});
