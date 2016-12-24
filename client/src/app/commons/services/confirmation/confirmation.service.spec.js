import appCommonsModule from '../../commons.module';
import { expect } from 'chai';
import sinon from 'sinon';

describe(`module ${appCommonsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appCommonsModule, ($provide) => {
      $provide.value('$window', { confirm: sinon.stub() });
    });
  });

  describe('service: confirmation', () => {

    it('displays a confirmation', inject(($window, confirmation) => {
      confirmation.show('The message');
      expect($window.confirm.calledWith('The message')).to.be.true;
    }));

  });

});
