import angular from 'angular';
import bootstrap from './bootstrap';
import { expect } from 'chai';
import sinon from 'sinon';

describe('boostrap', () => {

  let sandbox;

  beforeEach(inject(($document) => {
    sandbox = sinon.sandbox.create();

    // Do not boot the app in the test environment
    sandbox.stub(angular, 'bootstrap');
    sandbox.stub($document, 'ready').yields();
  }));

  afterEach(() => {
    sandbox.restore();
  });

  describe('.bootstrap', () => {

    it('boots the app', inject(($injector) => {
      // When
      $injector.invoke(bootstrap);

      // Then
      expect(angular.bootstrap.called).to.be.true;

      const [el, modules, options] = angular.bootstrap.lastCall.args;

      expect(el).to.eq('html');
      expect(modules[0]).to.eq('app');
      expect(options).to.have.property('strictDi', true);
    }));

  });

});
