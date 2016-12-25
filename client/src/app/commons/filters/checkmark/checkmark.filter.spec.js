import { expect } from 'chai';
import filtersModule from '../filters.module';

describe(`module ${filtersModule}`, () => {

  beforeEach(() => {
    angular.mock.module(filtersModule);
  });

  describe('filter: appCheckmark', () => {

    let filter;

    beforeEach(inject(($filter) => {
      filter = $filter('appCheckmark');
    }));

    it('returns a checkmark', () => {
      expect(filter(true)).to.equal('✓');
      expect(filter(false)).to.equal('✘');
    });

  });

});
