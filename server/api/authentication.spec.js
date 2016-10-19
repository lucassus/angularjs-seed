const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const request = require('supertest');

const app = require('../app');
const config = require('../config');
const db = require('../db');

describe('app', () => {

  beforeEach(() => {
    return db.seed();
  });

  describe('POST /api/authentication', () => {

    describe('with valid credentials', () => {

      const email = 'demo@email.com';
      const password = 'password';

      it('creates a contact', (done) => {
        request(app)
          .post('/api/authentication')
          .set('Accept', 'application/json')
          .send({ email, password })
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res) => {
            const { token } = res.body;
            const payload = jwt.verify(token, config.secret);

            expect(payload).to.have.property('id');
            expect(payload).to.have.property('email', email);
            expect(payload).to.not.have.property('passwordHash');
            expect(payload).to.have.property('iat');
            expect(payload).to.have.property('exp');
          })
          .end(done);
      });

    });

    describe('with invalid credentials', () => {

      const email = 'demo@email.com';
      const password = 'wrong';

      it('creates a contact', (done) => {
        request(app)
          .post('/api/authentication')
          .set('Accept', 'application/json')
          .send({ email, password })
          .expect(422)
          .end(done);
      });

    });

  });

});
