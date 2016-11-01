import appModule from './app.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${appModule}`, () => {

  beforeEach(angular.mock.module(appModule, ($provide) => {
    $provide.value('auth', {
      isAuthenticated: sinon.stub()
    });
  }));

  describe('navigating to unknown url', () => {

    beforeEach(inject((auth) => {
      auth.isAuthenticated.returns(true);
    }));

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

  describe('$transitions', () => {

    describe('to public state', () => {

      describe('when authenticated', () => {

        beforeEach(inject((auth) => {
          auth.isAuthenticated.returns(true);
        }));

        it('redirects to `home`', inject(($rootScope, $state) => {
          $state.go('login');
          $rootScope.$digest();
          expect($state.current.name).to.eq('home');
        }));

      });

      describe('when not authenticated', () => {

        beforeEach(inject((auth) => {
          auth.isAuthenticated.returns(false);
        }));

        it('does nothing', inject(($rootScope, $state) => {
          $state.go('login');
          $rootScope.$digest();
          expect($state.current.name).to.eq('login');
        }));

      });

    });

    describe('to the protected state', () => {

      describe('when authenticated', () => {

        beforeEach(inject((auth) => {
          auth.isAuthenticated.returns(true);
        }));

        it('does nothing', inject(($rootScope, $state) => {
          $state.go('home');
          $rootScope.$digest();
          expect($state.current.name).to.eq('home');
        }));

      });

      describe('when not authenticated', () => {

        beforeEach(inject((auth) => {
          auth.isAuthenticated.returns(false);
        }));

        it('redirects to `login`', inject(($rootScope, $state) => {
          $state.go('home');
          $rootScope.$digest();
          expect($state.current.name).to.eq('login');
        }));

      });

    });

  });

});
