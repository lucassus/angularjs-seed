import appHomeModule from '../home.module';
import { expect } from 'chai';

describe(`module: ${appHomeModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appHomeModule);
  });

  const stateName = 'home';

  describe(`state: ${stateName}`, () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get(stateName);
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/');
    }));

  });

});
