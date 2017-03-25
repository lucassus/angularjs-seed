import assert from 'assert';
import statesModule from '../../states.module';

describe(`module ${statesModule}`, () => {

  beforeEach(() => {
    angular.mock.module(statesModule);
  });

  describe('state `contacts.one.edit`', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.one.edit');
    }));

    it('has valid url', inject(($state) => {
      assert.equal($state.href(state, { id: 124 }), '#!/contacts/124/edit');
    }));

  });

});
