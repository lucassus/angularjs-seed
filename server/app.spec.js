const expect = require('chai').expect;
const request = require('supertest');

const app = require('./app');
const db = require('./db');

describe('app', () => {

  beforeEach(() => {
    return db.seed();
  });

  afterEach(() => {
    return db.drop();
  });

  describe('GET /api/contacts', () => {

    it('respond with json', (done) => {
      request(app)
        .get('/api/contacts')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          const { contacts } = res.body;
          expect(contacts).to.have.length(20);

          expect(contacts[0]).to.have.property('firstName', 'Wallace');
          expect(contacts[0]).to.have.property('lastName', 'Rath');
          expect(contacts[0]).to.have.property('email', 'Tessie_Carter16@gmail.com');
        })
        .end(done);
    });

  });

  describe('GET /api/contacts/validate-email', () => {

    describe('for non persisted contact', () => {

      describe('when an email is not taken', () => {

        it('responds with `{ taken: false }`', (done) => {
          request(app)
            .get('/api/contacts/validate-email?email=luke@rebel.org')
            .expect(200)
            .expect((res) => {
              expect(res.body).to.have.property('taken', false);
            })
            .end(done);
        });

      });

      describe('when an email is already taken', () => {

        const email = 'anakin@republic.org';

        beforeEach(() => {
          return db.contacts.insertOne({ email });
        });

        it('responds with `{ taken: true }`', (done) => {
          request(app)
            .get(`/api/contacts/validate-email?email=${email}`)
            .expect(200)
            .expect((res) => {
              expect(res.body).to.have.property('taken', true);
            })
            .end(done);
        });

      });

    });

    describe('for persisted contact', () => {

      let id;
      const email = 'vader@empire.com';

      beforeEach(() => {
        return db.contacts.insertOne({ email }).then((contact) => {
          id = contact.id;
        });
      });

      describe('when an email is not taken', () => {

        it('responds with `{ taken: false }`', (done) => {
          request(app)
            .get(`/api/contacts/validate-email?id=${id}email=${email}`)
            .expect(200)
            .expect((res) => {
              expect(res.body).to.have.property('taken', false);
            })
            .end(done);
        });

        it('responds with `{ taken: false }`', (done) => {
          request(app)
            .get(`/api/contacts/validate-email?id=${id}&email=tarkin@empire.com`)
            .expect(200)
            .expect((res) => {
              expect(res.body).to.have.property('taken', false);
            })
            .end(done);
        });

      });

      describe('when an email is taken', () => {

        const otherEmail = 'tarkin@empire.com';

        beforeEach(() => {
          return db.contacts.insertOne({ email: otherEmail });
        });

        it('responds with `{ taken: true }`', (done) => {
          request(app)
            .get(`/api/contacts/validate-email?id=${id}&email=${otherEmail}`)
            .expect(200)
            .expect((res) => {
              expect(res.body).to.have.property('taken', true);
            })
            .end(done);
        });

      });

    });

  });

  describe('GET /api/contacts/:id', () => {

    describe('when a contact can be found', () => {

      it('respond with json', (done) => {
        request(app)
          .get('/api/contacts/3')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
            const { body: contact } = res;

            expect(contact).to.have.property('id', 3);
            expect(contact).to.have.property('firstName', 'Caterina');
            expect(contact).to.have.property('lastName', 'Hackett');
            expect(contact).to.have.property('email', 'Destin.Kassulke80@hotmail.com');
          })
          .end(done);
      });

    });

    describe('when a contact cannot be found', () => {

      it('responds with 404', (done) => {
        request(app)
          .get('/api/contacts/21')
          .set('Accept', 'application/json')
          .expect(404)
          .end(done);
      });

    });

  });

});
