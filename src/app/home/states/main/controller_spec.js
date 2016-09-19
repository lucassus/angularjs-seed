import { expect } from 'chai';
import module from '../../module';
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
        alert: sinon.stub()
      });
    }));

    it('has a message', () => {
      expect(ctrl.message).to.eq('Hello World!');
    });

    describe('.sayHello', () => {

      it('alerts a message', () => {
        ctrl.sayHello();
        expect(ctrl.alert.calledWith('Hello World!')).to.be.true;
      });

    });

  });

});
