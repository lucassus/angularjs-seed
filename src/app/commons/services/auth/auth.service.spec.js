import appCommonsModule from '../../commons.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${appCommonsModule}`, () => {

  beforeEach(angular.mock.module(appCommonsModule, ($provide) => {
    $provide.decorator('session', ($delegate) => {
      'ngInject';
      return sinon.stub($delegate);
    });
  }));

  describe('service: auth', () => {

    let auth;

    beforeEach(inject(($injector) => {
      auth = $injector.get('auth');
    }));

    describe('.isAuthenticated', () => {

      describe('when the token is present', () => {

        beforeEach(inject((session) => {
          session.getToken.returns('the token');
        }));

        it('returns true', () => {
          expect(auth.isAuthenticated()).to.be.true;
        });

      });

      describe('when the token is not present', () => {

        beforeEach(inject((session) => {
          session.getToken.returns(null);
        }));

        it('returns false', () => {
          expect(auth.isAuthenticated()).to.be.false;
        });

      });

    });

    describe('.authenticate', () => {

      const credentials = {
        email: 'test@email.com',
        password: 'password'
      };

      let request;

      beforeEach(inject(($httpBackend) => {
        request = $httpBackend.expectPOST('/api/authentication', credentials);
      }));

      it('returns a promise', () => {
        expect(auth.authenticate(credentials)).to.be.a.promise;
      });

      describe('on success', () => {

        beforeEach(() => {
          request.respond(200, { token: 'the token' });
        });

        it('stores the token in the session', inject(($httpBackend, session) => {
          // When
          auth.authenticate(credentials);
          $httpBackend.flush();

          // Then
          expect(session.setToken.calledWith('the token'))
            .to.be.true;
        }));

      });

      describe('on error', () => {

        beforeEach(() => {
          request.respond(422);
        });

        it('does not store the token in the session', inject(($httpBackend, session) => {
          // When
          auth.authenticate(credentials);
          $httpBackend.flush();

          // Then
          expect(session.setToken.calledWith('the token'))
            .to.be.false;
        }));

      });

    });

    describe('.logout', () => {

      it('removes a token from the session', inject((session) => {
        // When
        auth.logout();

        // Then
        expect(session.removeToken.called).to.be.true;
      }));

    });

  });

});
