describe('Home page', () => {

  it('has a title', () => {
    browser.get('/');
    expect(browser.getTitle()).toEqual('Angular webpack seed');
  });

  it('has a page title', () => {
    expect(element(by.css('.page-header h2'))
      .getText()).toEqual('Hello World!');
  });

  describe('click on `Click me!` button', () => {

    it('displays an alert', () => {
      element(by.partialButtonText('Click me!')).click();

      const alert = browser.switchTo().alert();
      expect(alert.getText()).toEqual('Hello World!');
    });

  });

});
