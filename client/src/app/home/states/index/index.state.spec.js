import appHomeModule from '../../home.module';
import { expect } from 'chai';

describe(`module: ${appHomeModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appHomeModule);
  });

  describe('home', () => {

    let state;

    beforeEach(inject(($state) => {
      state = $state.get('home');
    }));

    it('has valid url', inject(($state) => {
      expect($state.href(state)).to.equal('#!/');
    }));

  });

});
