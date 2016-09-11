import { expect } from 'chai';
import appModule from '../app';
import 'angular-mocks';
import sinon from 'sinon';

describe('module `app`', () => {

  beforeEach(() => {
    angular.mock.module(appModule.name);
  });

  describe('controller `AppController`', () => {

    let ctrl;

    beforeEach(angular.mock.inject(($controller) => {
      ctrl = $controller('AppController', {
        $window: {
          alert: sinon.stub()
        }
      });
    }));

    it('has a message', () => {
      expect(ctrl.message).to.eq('Hello World!');
    });

    describe('.sayHello', function() {

      it('alerts a message', function() {
        ctrl.sayHello();
        expect(ctrl.$window.alert.calledWith('Hello World!')).to.be.true;
      });

    });

  });

});
