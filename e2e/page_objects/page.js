const { browser, by, element } = require('protractor');

module.exports = class {

  constructor(url) {
    this.url = url;

    this.header = element(by.css('.page-header h2'));
  }

  navigate() {
    browser.get(this.url);
  }

};
