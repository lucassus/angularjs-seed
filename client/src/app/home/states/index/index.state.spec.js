import appHomeModule from '../../home.module';
import { expect } from 'chai';
import { name } from './index.state';

describe(`module: ${appHomeModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appHomeModule);
  });

  describe(`state: ${name}`, () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get(name);
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/');
    }));

  });

});
