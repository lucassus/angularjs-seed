import appCommonsModule from '../../commons.module';
import { expect } from 'chai';

describe('squirrel.common module', () => {

  beforeEach(() => {
    angular.mock.module(appCommonsModule);
  });

  describe('appCheckmark filter', () => {

    let filter;

    beforeEach(inject(($filter) => {
      filter = $filter('appCheckmark');
    }));

    it('returns a checkmark', () => {
      expect(filter(true)).to.eq('✓');
      expect(filter(false)).to.eq('✘');
    });

  });

});
