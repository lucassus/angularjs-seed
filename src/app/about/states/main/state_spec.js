import appAboutModule from '../../about.module';
import { expect } from 'chai';

describe(`module: ${appAboutModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appAboutModule);
  });

  describe('state: about', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('about');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.eq('#/about');
    }));

  });

});
