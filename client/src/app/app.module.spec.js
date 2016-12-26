import appModule from './app.module';
import assert from 'assert';
import sinon from 'sinon';

describe(`module ${appModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appModule, ($provide) => {
      $provide.constant('appConfig', { environment: 'test' });
    });
  });

  describe('navigating to unknown url', () => {

    it('changes the state to `404`', inject(($location, $rootScope, $state) => {
      // Given
      assert.equal($state.current.name, '');

      // When
      $location.url('/unknown/url');
      $rootScope.$digest();

      // Then
      assert.equal($state.current.name, '404');
    }));

  });

  describe('on `$stateChangeError`', () => {

    beforeEach(inject(($log, $rootScope, $state) => {
      sinon.stub($log, 'error');
      sinon.stub($state, 'go');

      $rootScope.$broadcast('$stateChangeError');
    }));

    it('logs the error', inject(($log) => {
      assert($log.error.called);
    }));

    it('changes the state to `404`', inject(($state) => {
      assert($state.go.calledWith('404'));
    }));

  });

});
