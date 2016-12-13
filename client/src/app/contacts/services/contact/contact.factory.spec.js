import appContactsModule from '../../contacts.module';
import { expect } from 'chai';

describe(`module: ${appContactsModule}`, () => {

  beforeEach(() => {
    angular.mock.module(appContactsModule);
  });

  describe('resource: Contact', () => {

    let $httpBackend, Contact;

    beforeEach(inject(($injector) => {
      $httpBackend = $injector.get('$httpBackend');
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

    describe('Contact.query', () => {

      it('fetches a list of contacts', (done) => {
        $httpBackend
          .expectGET('/api/contacts')
          .respond(200, { contacts: [{ id: 1 }, { id: 2 }] });

        Contact.query().$promise.then((contacts) => {
          expect(contacts).to.have.length(2);

          expect(contacts[0]).to.be.an.instanceOf(Contact);
          expect(contacts[0]).to.have.property('id', 1);

          expect(contacts[1]).to.be.an.instanceOf(Contact);
          expect(contacts[1]).to.have.property('id', 2);

          done();
        });

        $httpBackend.flush();
      });

    });

    describe('Contact.get', () => {

      it('retrieves a contact', (done) => {
        $httpBackend
          .expectGET('/api/contacts/123')
          .respond(200, { id: 123, firstName: 'Luke' });

        Contact.get({ id: 123 }).$promise.then((contact) => {
          expect(contact).to.have.property('id', 123);
          expect(contact).to.have.property('firstName', 'Luke');

          done();
        });

        $httpBackend.flush();
      });

    });

    describe('.$create', () => {

      it('creates a contact', (done) => {
        $httpBackend
          .expectPOST('/api/contacts')
          .respond(200, { id: 123, firstName: 'Luke' });

        const contact = new Contact({ firstName: 'Luke' });
        contact.$create().then((createdContact) => {
          expect(createdContact).to.equal(contact);

          expect(createdContact).to.be.an.instanceOf(Contact);
          expect(createdContact).to.have.property('id', 123);
          expect(createdContact).to.have.property('firstName', 'Luke');

          done();
        });

        $httpBackend.flush();
      });

    });

    describe('.fullName', () => {

      it('returns the full name', () => {
        const contact = new Contact({ firstName: 'Luke', lastName: 'Skywalker' });
        expect(contact.fullName).to.equal('Luke Skywalker');
      });

    });

    describe('.toggleFavourite', () => {

      it('toggles `favourite` flag', (done) => {
        $httpBackend
          .expectPUT('/api/contacts/126', { id: 126, favourite: true })
          .respond(200, { id: 126, favourite: true });

        const contact = new Contact({ id: 126, favourite: false });

        contact.toggleFavourite().then((updatedContact) => {
          expect(updatedContact).to.equal(contact);
          expect(contact.favourite).to.be.true;

          done();
        });

        $httpBackend.flush();
      });

    });

  });

});
