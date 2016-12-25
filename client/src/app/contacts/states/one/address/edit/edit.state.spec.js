import { expect } from 'chai';
import statesModule from '../../../states.module';

describe(`module ${statesModule}`, () => {

  beforeEach(() => {
    angular.mock.module(statesModule);
  });

  describe('state `contacts.one.address.edit`', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.one.address.edit');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state, { id: 123 }))
        .to.equal('#!/contacts/123/address/edit');
    }));

  });

});
