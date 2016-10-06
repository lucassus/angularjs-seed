import Controller from './main.controller';
import appHomeModule from '../home.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${appHomeModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appHomeModule);
  });

  describe('controller: home', () => {

    let ctrl;

    beforeEach(inject(($controller) => {
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
