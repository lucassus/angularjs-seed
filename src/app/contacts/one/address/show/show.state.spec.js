import appContactsModule from '../../../contacts.module';
import { expect } from 'chai';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  const stateName = 'contacts.one.address.show';

  describe(`state: ${stateName}`, () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get(stateName);
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state, { id: 123 })).to.eq('#/contacts/123/address');
    }));

  });

});
