import appHomeModule from '../home.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${appHomeModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appHomeModule);
  });

  const stateName = 'home';

  describe(`controller: ${stateName}`, () => {

    let ctrl;

    beforeEach(inject(($controller, $state) => {
      const Controller = $state.get(stateName).controller;

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
