import module from '../module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
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
