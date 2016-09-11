import appModule from '../../app';
import { expect } from 'chai';
import sinon from 'sinon';

describe('module: app', () => {

  beforeEach(() => {
    angular.mock.module(appModule.name);
  });

  describe('controller: home', () => {

    let ctrl;

    beforeEach(inject(($controller, $state) => {
      const Controller = $state.get('home').controller;

      ctrl = $controller(Controller, {
        $window: {
          alert: sinon.stub()
        }
      });
    }));

    it('has a message', () => {
      expect(ctrl.message).to.eq('Hello World!');
    });

    describe('.sayHello', () => {

      it('alerts a message', () => {
        ctrl.sayHello();
        expect(ctrl.$window.alert.calledWith('Hello World!')).to.be.true;
      });

    });

  });

});
