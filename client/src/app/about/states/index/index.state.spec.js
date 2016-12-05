import appAboutModule from '../../about.module';
import { expect } from 'chai';
import { name } from './index.state';

describe(`module: ${appAboutModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appAboutModule);
  });

  describe(`state: ${name}`, () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get(name);
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/about');
    }));

  });

});
