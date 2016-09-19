import { expect } from 'chai';
import module from './module';
import sinon from 'sinon';

describe(`module: ${module}`, () => {

  beforeEach(() => {
    angular.mock.module(module);
  });

  describe('navigating to unknown url', () => {

    it('changes the state to `404`', inject(($location, $rootScope, $state) => {
      $location.url('/unknown/url');
      $rootScope.$digest();

      expect($state.current.name).to.eq('404');
    }));

  });

  describe('on `$stateChangeError`', () => {

    beforeEach(inject(($log, $rootScope, $state) => {
      sinon.stub($log, 'error');
      sinon.stub($state, 'go');

      $rootScope.$broadcast('$stateChangeError');
    }));

    it('logs the error', inject(($log) => {
      expect($log.error.called).to.be.true;
    }));

    it('changes the state to `404`', inject(($state) => {
      expect($state.go.calledWith('404')).to.be.true;
    }));

  });

});
