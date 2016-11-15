import appContactsModule from '../contacts.module';
import { expect } from 'chai';
import { name } from './new.state';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe(`state: ${name}`, () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get(name);
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/contacts/new');
    }));

  });

});
