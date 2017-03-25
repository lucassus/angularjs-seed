import assert from 'assert';
import { bootstrap } from './bootstrap';
import commonsModule from './commons/commons.module';
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
        assert(app.constant.calledWith('appConfig', {
          environment: 'test'
        }));
      });

      it('boots the app', () => {
        assert(angular.bootstrap.called);

        const [el, modules, options] = angular.bootstrap.lastCall.args;

        assert.equal(el, 'html');
        assert.equal(modules[0], 'app');
        assert(options.strictDi);
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
        assert($log.error.called);
      }));

    });

  });

});
