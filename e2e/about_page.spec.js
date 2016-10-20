const Page = require('./page_objects/page');

class AboutPage extends Page {

}

describe('About page', () => {

  const page = new AboutPage('/about');

  beforeEach(() => {
    page.navigate();
  });

  it('has a title', () => {
    expect(page.header.getText())
      .toEqual('About page');
  });

});
