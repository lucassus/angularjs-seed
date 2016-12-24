import appCommonsModule from '../../commons.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module ${appCommonsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appCommonsModule, ($provide) => {
      $provide.value('$window', { alert: sinon.stub() });
    });
  });

  describe('service: alert', () => {

    it('displays the message', inject(($window, alert) => {
      alert.show('The message');
      expect($window.alert.calledWith('The message')).to.be.true;
    }));

  });

});
