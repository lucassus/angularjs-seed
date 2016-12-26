import assert from 'assert';
import servicesModule from '../services.module';

describe(`module ${servicesModule}`, () => {

  beforeEach(() => {
    angular.mock.module(servicesModule);
  });

  describe('resource: Contact', () => {

    let $httpBackend, Contact;

    beforeEach(inject(($injector) => {
      $httpBackend = $injector.get('$httpBackend');
      Contact = $injector.get('Contact');
    }));

    it('has basic CRUD methods', () => {
      assert(Contact.prototype.$query instanceof Function);
      assert(Contact.prototype.$get instanceof Function);
      assert(Contact.prototype.$create instanceof Function);
      assert(Contact.prototype.$update instanceof Function);
      assert(Contact.prototype.$delete instanceof Function);
    });

    it('can be initialized', () => {
      const contact = new Contact({ id: 123 });
      assert.equal(contact.id, 123);
    });

    describe('Contact.query', () => {

      it('fetches a list of contacts', (done) => {
        $httpBackend
          .expectGET('/api/contacts')
          .respond(200, { contacts: [{ id: 1 }, { id: 2 }] });

        Contact.query().$promise.then((contacts) => {
          assert.equal(contacts.length, 2);

          assert(contacts[0] instanceof Contact);
          assert.equal(contacts[0].id, 1);

          assert(contacts[1] instanceof Contact);
          assert.equal(contacts[1].id, 2);

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
          assert.equal(contact.id, 123);
          assert.equal(contact.firstName, 'Luke');

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
          assert.equal(createdContact, contact);

          assert(createdContact instanceof Contact);
          assert.equal(createdContact.id, 123);
          assert.equal(createdContact.firstName, 'Luke');

          done();
        });

        $httpBackend.flush();
      });

    });

    describe('.fullName', () => {

      it('returns the full name', () => {
        const contact = new Contact({ firstName: 'Luke', lastName: 'Skywalker' });
        assert.equal(contact.fullName, 'Luke Skywalker');
      });

    });

    describe('.toggleFavourite', () => {

      it('toggles `favourite` flag', (done) => {
        $httpBackend
          .expectPUT('/api/contacts/126', { id: 126, favourite: true })
          .respond(200, { id: 126, favourite: true });

        const contact = new Contact({ id: 126, favourite: false });

        contact.toggleFavourite().then((updatedContact) => {
          assert.equal(updatedContact, contact);
          assert(contact.favourite);

          done();
        });

        $httpBackend.flush();
      });

    });

  });

});
