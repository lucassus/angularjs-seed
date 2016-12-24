import appModule from './app.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module ${appModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appModule);
  });

  describe('navigating to unknown url', () => {

    it('changes the state to `404`', inject(($location, $rootScope, $state) => {
      // Given
      expect($state.current.name).to.equal('');

      // When
      $location.url('/unknown/url');
      $rootScope.$digest();

      // Then
      expect($state.current.name).to.equal('404');
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
