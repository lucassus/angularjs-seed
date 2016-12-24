import { expect } from 'chai';
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
      expect($window.confirm.calledWith('The message')).to.be.true;
    }));

  });

});
