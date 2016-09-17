import angular from 'angular';
import bootstrap from './bootstrap';
import { expect } from 'chai';
import sinon from 'sinon';

describe('boostrap', () => {

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    // Do not boot the app in the test environment
    sandbox.stub(angular, 'bootstrap');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('.bootstrap', () => {

    it('boots the app', (done) => {
      inject(($document, $injector) => {
        $injector.invoke(bootstrap);

        angular.element($document).ready(() => {
          expect(angular.bootstrap.called).to.be.true;

          const [, modules, options] = angular.bootstrap.lastCall.args;
          expect(modules[0]).to.eq('app');
          expect(options).to.have.property('strictDi', true);

          done();
        });
      });
    });

  });

});
