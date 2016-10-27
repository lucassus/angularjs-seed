import commonsModule from '../../commons.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${commonsModule}`, () => {

  beforeEach(angular.mock.module(commonsModule, ($provide) => {
    $provide.value('session', {
      getToken: sinon.stub(),
      removeToken: sinon.stub()
    });
  }));

  let $http, $httpBackend;

  beforeEach(inject(($injector) => {
    $http = $injector.get('$http');
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('unauthorized access interceptor', () => {

    describe('on `401` http error', () => {

      beforeEach(inject((toastr) => {
        // Given
        sinon.stub(toastr, 'error');

        $httpBackend
          .expectGET('/api/test')
          .respond(401);

        // When
        $http.get('/api/test');
        $httpBackend.flush();
      }));

      it('removes a token from the session', inject((session) => {
        expect(session.removeToken.called).to.be.true;
      }));

      it('displays an error', inject((toastr) => {
        expect(toastr.error.calledWith('Unauthorized')).to.be.true;
      }));

    });

    describe('on non `401` http error', () => {

      beforeEach(() => {
        // Given
        $httpBackend
          .expectGET('/api/test')
          .respond(422);

        // When
        $http.get('/api/test');
        $httpBackend.flush();
      });

      it('does not remove a token from the session', inject((session) => {
        expect(session.removeToken.called).to.be.false;
      }));

    });

  });

});
