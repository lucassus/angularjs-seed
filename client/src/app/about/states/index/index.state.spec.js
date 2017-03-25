import assert from 'assert';
import statesModule from '../states.module';

describe(`module ${statesModule}`, () => {

  beforeEach(() => {
    angular.mock.module(statesModule);
  });

  describe('state `about`', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('about');
    }));

    it('has valid url', inject(($state) => {
      assert.equal($state.href(state), '#!/about');
    }));

  });

});
