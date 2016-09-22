module.exports = class {

  constructor(url) {
    this.url = url;

    this.pageHeader = element(by.css('.page-header h2'));
  }

  open() {
    browser.get(this.url);
  }

};
