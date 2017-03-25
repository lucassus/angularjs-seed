import assert from 'assert';
import statesModule from '../states.module';

describe(`module ${statesModule}`, () => {

  beforeEach(() => {
    angular.mock.module(statesModule);
  });

  describe('state `contacts.list` component', () => {

    let ctrl;

    beforeEach(inject(($componentController, $state, Contact) => {
      const state = $state.get('contacts.list');

      ctrl = $componentController(state.component, {}, {
        contacts: [
          new Contact({ id: 1, firstName: 'Karen' }),
          new Contact({ id: 2, firstName: 'Luke' })
        ]
      });
    }));

    it('has an array of contacts', inject((Contact) => {
      assert(ctrl.contacts instanceof Array);
      assert.equal(ctrl.contacts.length, 2);

      assert(ctrl.contacts[0] instanceof Contact);
      assert.equal(ctrl.contacts[0].id, 1);
      assert.equal(ctrl.contacts[0].firstName, 'Karen');

      assert(ctrl.contacts[1] instanceof Contact);
      assert.equal(ctrl.contacts[1].id, 2);
      assert.equal(ctrl.contacts[1].firstName, 'Luke');
    }));

  });

});
