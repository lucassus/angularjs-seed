exports.config = {
  directConnect: true,
  chromeDriver: 'node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.22',
  capabilities: {
    browserName: 'chrome'
  },

  baseUrl: 'http://localhost:8080',

  framework: 'jasmine',
  specs: ['e2e/**/*_spec.js']
};
