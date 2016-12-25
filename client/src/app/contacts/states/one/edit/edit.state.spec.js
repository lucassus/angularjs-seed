import { expect } from 'chai';
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
      expect($state.href(state, { id: 124 })).to.equal('#!/contacts/124/edit');
    }));

  });

});
