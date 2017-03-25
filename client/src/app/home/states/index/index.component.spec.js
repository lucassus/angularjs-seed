import assert from 'assert';
import sinon from 'sinon';
import statesModule from '../states.module';

describe(`module ${statesModule}`, () => {

  beforeEach(() => {
    angular.mock.module(statesModule);
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
      assert.equal(ctrl.message, 'Hello World!');
    });

    describe('.sayHello', () => {

      it('alerts a message', () => {
        ctrl.sayHello();
        assert(ctrl.alert.show.calledWith('Hello World!'));
      });

    });

  });

});
