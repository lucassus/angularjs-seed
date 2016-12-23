import appContactsModule from '../../../contacts.module';
import { expect } from 'chai';

describe(`module ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
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
