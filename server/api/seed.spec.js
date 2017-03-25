const assert = require('power-assert');
const request = require('supertest');

const app = require('../app');
const db = require('../db');

describe('app', () => {

  describe('POST /api/seed', () => {

    it('seeds the database', (done) => {
      request(app)
        .post('/api/seed')
        .expect(200)
        .end(() => {
          db.contacts.find().then((contacts) => {
            assert(contacts.length === 20);
            done();
          });
        });
    });

  });

});
