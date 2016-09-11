import 'angular';
import 'angular-mocks';

// eslint-disable-next-line no-undef
const testsContext = require.context('.', true, /_spec$/);
testsContext.keys().forEach(testsContext);
