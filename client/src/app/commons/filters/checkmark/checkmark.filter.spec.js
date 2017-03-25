import assert from 'assert';
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
      assert.equal(filter(true), '✓');
      assert.equal(filter(false), '✘');
    });

  });

});
