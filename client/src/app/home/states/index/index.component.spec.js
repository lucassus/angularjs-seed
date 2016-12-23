import appHomeModule from '../../home.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module: ${appHomeModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appHomeModule);
  });

  describe('`index` component', () => {

    let ctrl;

    beforeEach(inject(($componentController, $state) => {
      const componentName = $state.get('home').component;

      ctrl = $componentController(componentName, {
        alert: sinon.stub()
      });
    }));

    it('has a message', () => {
      expect(ctrl.message).to.equal('Hello World!');
    });

    describe('.sayHello', () => {

      it('alerts a message', () => {
        ctrl.sayHello();
        expect(ctrl.alert.calledWith('Hello World!')).to.be.true;
      });

    });

  });

});
