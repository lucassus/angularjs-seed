const Page = require('./page_objects/page');
const Table = require('./page_objects/table');
const FavouriteButton = require('./page_objects/favourite_button');

class ListPage extends Page {

  constructor(url) {
    super(url);

    this.addButton = element(by.partialButtonText('Add new contact'));

    this.table = new Table(element(by.css('table.table')),
      by.repeater('contact in ctrl.contacts'));
  }

  nthToggleFavouriteButton(n) {
    return new FavouriteButton(this.table.row(n).element(by.css('button.btn')));
  }

}

describe('Contacts page', () => {

  const page = new ListPage('/#/contacts/');

  beforeEach(() => {
    page.navigate();
  });

  describe('list', () => {

    it('displays contacts list', () => {
      expect(page.pageHeader.getText()).toEqual('Contacts list');

      page.table.all().then((rows) => {
        expect(rows.length).toEqual(20);
      });

      expect(page.table.cell(0, 'contact.fullName').getText())
        .toEqual('Robert Donnelly');
      expect(page.table.cell(0, 'contact.email').getText())
        .toEqual('Julio_Wuckert@hotmail.com');
      expect(page.table.cell(0, 'contact.phone').getText())
        .toEqual('822.315.6267 x0081');
      expect(page.table.cell(1, 'contact.fullName').getText())
        .toEqual('Roxane Witting');

      const favButton = page.nthToggleFavouriteButton(1);
      expect(favButton.isToggled()).toEqual(true);

      favButton.toggle();
      expect(favButton.isToggled()).toEqual(false);
    });

  });

  describe('create', () => {

    it('creates a new contact', () => {
      page.addButton.click();
    });

  });

});
