import { expect } from 'chai';
import module from '../../module';
import sinon from 'sinon';

describe(`module: ${module}`, () => {

  beforeEach(() => {
    angular.mock.module(module, ($provide) => {
      $provide.value('$window', { confirm: sinon.stub() });
    });
  });

  describe('service: confirm', () => {

    it('displays a confirmation', inject(($window, confirm) => {
      confirm('The message');
      expect($window.confirm.calledWith('The message')).to.be.true;
    }));

  });

});
