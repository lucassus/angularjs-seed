import appContactsModule from '../../../../contacts.module';
import { expect } from 'chai';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe('contacts.one.address.show', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('contacts.one.address.show');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state, { id: 123 })).to.equal('#!/contacts/123/address');
    }));

  });

});
