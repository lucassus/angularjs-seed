import assert from 'assert';
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
      assert.equal(ctrl.contact.id, 2);
      assert.equal(ctrl.contact.name, 'bar');
    });

  });

});
