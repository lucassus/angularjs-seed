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

  describe('GET /api/contacts/:id', () => {

    // TODO when can be found
    // TODO when cannot be found

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

});
