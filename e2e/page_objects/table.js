module.exports = class {

  constructor(el, locator) {
    this.el = el;
    this.locator = locator;
  }

  all() {
    return this.el.all(this.locator);
  }

  row(n) {
    return this.el.element(this.locator.row(n));
  }

  cell(n, binding) {
    return this.el.element(this.locator.row(n).column(binding));
  }

};
