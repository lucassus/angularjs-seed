import appHomeModule from '../../home.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module ${appHomeModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appHomeModule);
  });

  describe('state `home` component', () => {

    let ctrl;

    beforeEach(inject(($componentController, $state, alert) => {
      const state = $state.get('home');

      sinon.stub(alert, 'show');

      ctrl = $componentController(state.component, {
        alert
      });

      ctrl.$onInit();
    }));

    it('has a message', () => {
      expect(ctrl.message).to.equal('Hello World!');
    });

    describe('.sayHello', () => {

      it('alerts a message', () => {
        ctrl.sayHello();
        expect(ctrl.alert.show.calledWith('Hello World!')).to.be.true;
      });

    });

  });

});
