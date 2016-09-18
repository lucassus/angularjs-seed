// TODO ignore imports order
import angular from 'angular';
import 'angular-mocks';

// Enable strictDi mode for all specs
beforeEach(() => {
  angular.mock.inject.strictDi(true);
});

// eslint-disable-next-line no-undef
const testsContext = require.context('.', true, /_spec$/);
testsContext.keys().forEach(testsContext);
