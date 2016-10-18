const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app');
const db = require('../db');

function itRespondsWith404(cb) {
  it('responds with 404', (done) => {
    cb(request(app))
      .set('Accept', 'application/json')
      .expect(404)
      .end(done);
  });
}

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

  describe('POST /api/contacts', () => {

    it('creates a contact', (done) => {
      const firstName = 'Luke';
      const lastName = 'Skywalker';
      const email = 'luke@rebel.org';

      request(app)
        .post('/api/contacts')
        .set('Accept', 'application/json')
        .send({ firstName, lastName, email })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          const { body: contact } = res;

          expect(contact).to.have.property('id', 21);
          expect(contact).to.have.property('firstName', firstName);
          expect(contact).to.have.property('lastName', lastName);
          expect(contact).to.have.property('email', email);
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

      itRespondsWith404((req) => {
        return req.get('/api/contacts/21');
      });

    });

  });

  describe('PUT /api/contacts/:id', () => {

    describe('when a contact can be found', () => {

      let id;

      beforeEach(() => {
        return db.contacts.insertOne({ firstName: 'Anakin', lastName: 'Skywalker' }).then((contact) => {
          id = contact.id;
        });
      });

      it('updates the contact', (done) => {
        request(app)
          .put(`/api/contacts/${id}`)
          .set('Accept', 'application/json')
          .send({ firstName: 'Luke' })
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
            const { body: contact } = res;

            expect(contact).to.have.property('id', id);
            expect(contact).to.have.property('firstName', 'Luke');
            expect(contact).to.have.property('lastName', 'Skywalker');
          })
          .end(done);
      });

    });

    describe('when a contact cannot be found', () => {

      itRespondsWith404((req) => {
        return req.put('/api/contacts/21');
      });

    });

  });

  describe('DELETE /api/contacts/:id', () => {

    describe('when a contact can be found', () => {

      let contact;

      beforeEach(() => {
        return db.contacts.insertOne({ firstName: 'Luke' }).then((createdContact) => {
          contact = createdContact;
        });
      });

      it('deletes the contact', (done) => {
        const { id } = contact;

        request(app)
          .delete(`/api/contacts/${id}`)
          .set('Accept', 'application/json')
          .expect(200)
          .end(() => {
            db.contacts.findOne({ id }).catch(() => {
              done();
            });
          });
      });

    });

    describe('when a contact cannot be found', () => {

      itRespondsWith404((req) => {
        return req.delete('/api/contacts/21');
      });

    });

  });

});
