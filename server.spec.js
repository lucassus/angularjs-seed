const expect = require('chai').expect;
const request = require('supertest');

const app = require('./server');

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

        expect(contacts[0]).to.property('firstName', 'Wallace');
        expect(contacts[0]).to.property('lastName', 'Rath');
        expect(contacts[0]).to.property('email', 'Tessie_Carter16@gmail.com');
      })
      .end(done);
  });

});
