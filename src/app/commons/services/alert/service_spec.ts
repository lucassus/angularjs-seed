import { expect } from 'chai';
import module from '../../module';
import * as sinon from 'sinon';

describe(`module: ${module}`, () => {

  beforeEach(() => {
    angular.mock.module(module, ($provide) => {
      $provide.value('$window', { alert: sinon.stub() });
    });
  });

  describe('service: alert', () => {

    it('displays the message', inject(($window, alert) => {
      alert('The message');
      expect($window.alert.calledWith('The message')).to.be.true;
    }));

  });

});
