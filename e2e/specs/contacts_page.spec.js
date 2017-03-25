const { element, by } = require('protractor');

const Page = require('../page_objects/page');
const Table = require('../page_objects/table');
const FavouriteButton = require('../page_objects/favourite_button');

class ListPage extends Page {

  constructor(url) {
    super(url);

    this.addButton = element(by.partialButtonText('Add new contact'));

    this.table = new Table(element(by.css('table.table')),
      by.repeater('contact in $ctrl.contacts'));
  }

  nthToggleFavouriteButton(n) {
    return new FavouriteButton(this.table.row(n).element(by.css('button.btn')));
  }

}

describe('Contacts page', () => {

  const page = new ListPage('/contacts');

  beforeEach(() => {
    page.navigate();
  });

  describe('list', () => {

    it('displays contacts list', () => {
      expect(page.header.getText()).toEqual('Contacts list');

      expect(page.table.all().count()).toEqual(20);

      expect(page.table.cell(0, 'contact.fullName').getText())
        .toEqual('Wallace Rath');
      expect(page.table.cell(0, 'contact.email').getText())
        .toEqual('Tessie_Carter16@gmail.com');
      expect(page.table.cell(0, 'contact.phone').getText())
        .toEqual('618-677-6695 x69742');
      expect(page.table.cell(1, 'contact.fullName').getText())
        .toEqual('Rico Pouros');

      const favButton = page.nthToggleFavouriteButton(1);
      expect(favButton.isToggled()).toEqual(false);

      favButton.toggle();
      expect(favButton.isToggled()).toEqual(true);
    });

  });

  describe('create', () => {

    it('creates a new contact', () => {
      page.addButton.click();
    });

  });

});
