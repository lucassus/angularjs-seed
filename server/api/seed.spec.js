const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app');
const db = require('../db');

describe('seed API', () => {

  describe('POST /api/seed', () => {

    it('seeds the database', (done) => {
      request(app)
        .post('/api/seed')
        .expect(200)
        .end(() => {
          db.contacts.find().then((contacts) => {
            expect(contacts).to.have.length(20);
            done();
          });
        });
    });

  });

});
