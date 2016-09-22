module.exports = class {

  constructor(el) {
    this.el = el;
  }

  toggle() {
    this.el.click();

    browser.wait(() => {
      return this.el.isEnabled();
    }, 5000, 'Unable to toggle favourite');
  }

  isToggled() {
    return this.el.element(by.css('span.glyphicon')).getAttribute('class')
      .then((attr) => attr.split(/\s+/))
      .then((classes) => {
        if (classes.includes('glyphicon-star')) {
          return true;
        }

        if (classes.includes('glyphicon-star-empty')) {
          return false;
        }

        return false;
      });
  }

};
