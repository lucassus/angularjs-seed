import appAuthenticationModule from '../authentication.module';
import { expect } from 'chai';
import { name } from './login.state';

describe(`module: ${appAuthenticationModule}`, () => {

  beforeEach(angular.mock.module(appAuthenticationModule));

  describe(`state: ${name}`, () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get(name);
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/login');
    }));

  });

});
