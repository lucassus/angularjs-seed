describe('Home page', () => {

  it('should have a title', () => {
    browser.get('/');
    expect(browser.getTitle()).toEqual('Angular webpack seed');
  });

});
