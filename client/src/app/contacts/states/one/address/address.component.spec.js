import { expect } from 'chai';
import statesModule from '../../states.module';

describe(`module ${statesModule}`, () => {

  beforeEach(() => {
    angular.mock.module(statesModule);
  });

  describe('state `contacts.one.address` component', () => {

    let ctrl;

    beforeEach(inject(($componentController, $state, Contact) => {
      const state = $state.get('contacts.one.address');

      ctrl = $componentController(state.component, {}, {
        contact: new Contact({ id: 2, name: 'bar' })
      });
    }));

    it('has a contact', () => {
      expect(ctrl.contact).to.have.property('id', 2);
      expect(ctrl.contact).to.have.property('name', 'bar');
    });

  });

});
