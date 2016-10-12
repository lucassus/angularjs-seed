import appCommonsModule from '../../commons.module';
import { expect } from 'chai';

describe(`module: ${appCommonsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appCommonsModule);
  });

  describe('filter: appCheckmark', () => {

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
