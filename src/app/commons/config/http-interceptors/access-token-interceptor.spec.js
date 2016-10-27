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

  describe('access token interceptor', () => {

    describe('when the token is set', () => {

      beforeEach(inject((session) => {
        session.getToken.returns('the token');
      }));

      it('sends http with valid header', (done) => {
        $httpBackend
          .expectGET('/api/test', (headers) => {
            expect(headers).to.have.property('x-access-token', 'the token');
            done();
          })
          .respond(200);

        $http.get('/api/test');

        $httpBackend.flush();
      });

    });

    describe('when the token is not set', () => {

      beforeEach(inject((session) => {
        session.getToken.returns(undefined);
      }));

      it('sends http with valid header', (done) => {
        $httpBackend
          .expectGET('/api/test', (headers) => {
            expect(headers).to.not.have.property('x-access-token');
            done();
          })
          .respond(200);

        $http.get('/api/test');

        $httpBackend.flush();
      });

    });

  });

});
