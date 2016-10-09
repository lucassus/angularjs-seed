import appContactsModule from '../../contacts.module';
import { expect } from 'chai';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  const stateName = 'contacts.one.edit';

  describe(`state: ${stateName}`, () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get(stateName);
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state, { id: 124 })).to.eq('#/contacts/124/edit');
    }));

  });

});
