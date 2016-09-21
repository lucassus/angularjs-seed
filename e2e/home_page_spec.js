class HomePage {

  open() {
    browser.get('/');
  }

  get pageHeader() {
    return element(by.css('.page-header h2'));
  }

  get clickMeButton() {
    return element(by.partialButtonText('Click me!'));
  }

}

describe('Home page', () => {

  const page = new HomePage();

  beforeEach(() => {
    page.open();
  });

  it('has a title', () => {
    expect(page.pageHeader.getText())
      .toEqual('Hello World!');
  });

  describe('click on `Click me!` button', () => {

    it('displays an alert', () => {
      page.clickMeButton.click();

      const alert = browser.switchTo().alert();
      expect(alert.getText()).toEqual('Hello World!');
    });

  });

});
