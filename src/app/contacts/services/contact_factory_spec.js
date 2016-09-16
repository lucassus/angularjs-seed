import { expect } from 'chai';
import module from '../module';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('resource: Contact', () => {

    let Contact;

    beforeEach(inject(($injector) => {
      Contact = $injector.get('Contact');
    }));

    it('has basic CRUD methods', () => {
      expect(Contact.prototype).to.respondTo('$query');
      expect(Contact.prototype).to.respondTo('$get');
      expect(Contact.prototype).to.respondTo('$create');
      expect(Contact.prototype).to.respondTo('$update');
      expect(Contact.prototype).to.respondTo('$delete');
    });

    it('can be initialized', () => {
      const contact = new Contact({ id: 123 });
      expect(contact).to.have.property('id', 123);
    });

    describe('.fullName', () => {

      it('returns the full name', () => {
        const contact = new Contact({ firstName: 'Luke', lastName: 'Skywalker' });
        expect(contact.fullName).to.eq('Luke Skywalker');
      });

    });

  });

});
