import assert from 'assert';
import servicesModule from '../services.module';
import sinon from 'sinon';

describe(`module ${servicesModule}`, () => {

  beforeEach(() => {
    angular.mock.module(servicesModule, ($provide) => {
      $provide.value('$window', { alert: sinon.stub() });
    });
  });

  describe('service: alert', () => {

    it('displays the message', inject(($window, alert) => {
      alert.show('The message');
      assert($window.alert.calledWith('The message'));
    }));

  });

});
