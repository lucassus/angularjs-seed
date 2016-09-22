module.exports = class {

  constructor(url) {
    this.url = url;

    this.pageHeader = element(by.css('.page-header h2'));
  }

  navigate() {
    browser.get(this.url);
  }

};
