import { bootstrap } from './bootstrap';
import commonsModule from './commons/commons.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe('boostrap', () => {

  let sandbox, app;

  beforeEach(inject(($document) => {
    sandbox = sinon.sandbox.create();

    // Spy on constant creation
    app = angular.module(commonsModule);
    sandbox.spy(app, 'constant');

    // Do not boot the app in the test environment
    sandbox.stub(angular, 'bootstrap');
    sandbox.stub($document, 'ready').yields();
  }));

  afterEach(() => {
    sandbox.restore();
  });

  describe('.bootstrap', () => {

    let request;

    beforeEach(inject(($httpBackend) => {
      request = $httpBackend.expectGET('/api/config');
    }));

    describe('on success', () => {

      beforeEach(inject(($httpBackend, $injector) => {
        request.respond(200, { environment: 'test' });

        $injector.invoke(bootstrap);
        $httpBackend.flush();
      }));

      it('configures the module', () => {
        expect(app.constant.calledWith('appConfig', {
          environment: 'test'
        })).to.be.true;
      });

      it('boots the app', () => {
        expect(angular.bootstrap.called).to.be.true;

        const [el, modules, options] = angular.bootstrap.lastCall.args;

        expect(el).to.equal('html');
        expect(modules[0]).to.equal('app');
        expect(options).to.have.property('strictDi', true);
      });

    });

    describe('on error', () => {

      beforeEach(() => {
        request.respond(500);
      });

      it('logs the error', inject(($httpBackend, $injector, $log) => {
        sinon.stub($log, 'error');

        // When
        $injector.invoke(bootstrap);
        $httpBackend.flush();

        // Then
        expect($log.error.called).to.be.true;
      }));

    });

  });

});
