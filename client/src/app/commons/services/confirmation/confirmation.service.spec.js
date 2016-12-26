import assert from 'assert';
import servicesModule from '../services.module';
import sinon from 'sinon';

describe(`module ${servicesModule}`, () => {

  beforeEach(() => {
    angular.mock.module(servicesModule, ($provide) => {
      $provide.value('$window', { confirm: sinon.stub() });
    });
  });

  describe('service: confirmation', () => {

    it('displays a confirmation', inject(($window, confirmation) => {
      confirmation.show('The message');
      assert($window.confirm.calledWith('The message'));
    }));

  });

});
