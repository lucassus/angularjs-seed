import appCommonsModule from '../../commons.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${appCommonsModule}`, () => {

  beforeEach(angular.mock.module(appCommonsModule));

  describe('service: session', () => {

    let session;

    beforeEach(inject(($injector) => {
      session = $injector.get('session');
    }));

    describe('.setToken', () => {

      it('sets a token in the local storage', inject((localStorage) => {
        // Given
        sinon.stub(localStorage, 'setItem');

        // When
        session.setToken('the token');

        // Then
        expect(localStorage.setItem.calledWith('token', 'the token')).to.be.true;
      }));

    });

    describe('.getToken', () => {

      it('retrieves a token from the local storage', inject((localStorage) => {
        // Given
        sinon.stub(localStorage, 'getItem').returns('the token');

        // When
        expect(session.getToken()).to.eq('the token');

        // Then
        expect(localStorage.getItem.calledWith('token')).to.be.true;
      }));

    });

    describe('.removeToken', () => {

      it('removes a token from the local storage', inject((localStorage) => {
        // Given
        sinon.stub(localStorage, 'removeItem');

        // When
        session.removeToken();

        // Then
        expect(localStorage.removeItem.calledWith('token')).to.be.true;
      }));

    });

  });

});
