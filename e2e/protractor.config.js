const utils = require('./utils');

exports.config = {
  directConnect: true,
  chromeDriver: '../node_modules/webdriver-manager/selenium/chromedriver_2.31',
  capabilities: {
    browserName: 'chrome'
  },

  baseUrl: 'http://localhost:8080',

  framework: 'jasmine',
  specs: [
    'setup.js',
    'specs/**/*.spec.js'
  ],

  onPrepare() {
    /* global browser */
    /* global jasmine */

    // Cleanup artifacts dir
    utils.cleanupArtifacts();

    // Collect screenshots for failed scenarios
    jasmine.getEnv().addReporter({
      specDone(result) {
        if (result.status === 'failed') {
          utils.takeScreenshot(result.fullName);
        }
      }
    });

    // Write browser's logs
    jasmine.getEnv().addReporter({
      specDone(result) {
        browser.manage().logs().get('browser').then((browserLog) => {
          utils.writeBrowserLog(result.fullName, browserLog);
        });
      }
    });
  }
};
