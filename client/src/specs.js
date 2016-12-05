import 'angular';
import 'angular-mocks';
import chai from 'chai';

function expectToBeAPromise(_chai) {
  _chai.Assertion.addProperty('promise', function () {
    const subject = this._obj;

    const assertion = angular.isFunction(subject.then)
      && angular.isFunction(subject.catch)
      && angular.isFunction(subject.finally);

    const expectedMessage = 'expected #{this} to be a promise';
    const notExpectedMessage = 'expected #{this} not to be a promise';

    this.assert(assertion, expectedMessage, notExpectedMessage);
  });
}

chai.use(expectToBeAPromise);

// Enable strictDi mode for all specs
beforeEach(() => {
  angular.mock.inject.strictDi(true);
});

// eslint-disable-next-line no-undef
const testsContext = require.context('.', true, /\.spec$/);
testsContext.keys().forEach(testsContext);
