import assert from 'assert';
import statesModule from '../states.module';

describe(`module ${statesModule}`, () => {

  beforeEach(() => {
    angular.mock.module(statesModule);
  });

  describe('state `contacts.new`', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.new');
    }));

    it('has valid url', inject(($state) => {
      assert.equal($state.href(state), '#!/contacts/new');
    }));

  });

});
