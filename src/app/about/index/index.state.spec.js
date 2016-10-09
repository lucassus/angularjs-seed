import appAboutModule from '../about.module';
import { expect } from 'chai';

describe(`module: ${appAboutModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appAboutModule);
  });

  const stateName = 'about';

  describe(`state: ${stateName}`, () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get(stateName);
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/about');
    }));

  });

});
