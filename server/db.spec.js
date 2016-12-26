const assert = require('power-assert');
const db = require('./db');

describe('db', () => {

  describe('seed', () => {

    it('seed the fake database', () => {
      return db.seed().then(() => {
        return db.contacts.find();
      }).then((contacts) => {
        assert(contacts.length === 20);

        assert(contacts[0].id === 1);
        assert(contacts[1].id === 2);
        assert(contacts[19].id === 20);
      });
    });

  });

  describe('.drop', () =>{

    beforeEach(() =>{
      return db.seed();
    });

    it('removes all collections', () =>{
      return db.drop().then(() => {
        return db.contacts.find();
      })
      .then((contacts) => {
        assert(contacts.length === 0);
      })
      .then(() => {
        return db.contacts.insertOne({ email: 'test@email.com' });
      })
      .then(() => {
        return db.contacts.find().then((contacts) => {
          assert(contacts.length === 1);
          assert(contacts[0].id === 1);
          assert(contacts[0].email === 'test@email.com');
        });
      });
    });

  });

});
