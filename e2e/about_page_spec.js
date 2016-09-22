const Page = require('./support/page');

class AboutPage extends Page {

}

describe('About page', () => {

  const page = new AboutPage('/#/about');

  beforeEach(() => {
    page.open();
  });

  it('has a title', () => {
    expect(page.pageHeader.getText())
      .toEqual('About page');
  });

});
