const db = require('./db');
const expect = require('chai').expect;

describe('db', () => {

  describe('seed', () => {

    beforeEach(() => {
      return db.seed();
    });

    it('seeds contacts', () => {
      return db.contacts.find().then((contacts) => {
        expect(contacts).to.have.length(20);

        expect(contacts[0]).to.have.property('id', 1);
        expect(contacts[1]).to.have.property('id', 2);
        expect(contacts[19]).to.have.property('id', 20);
      });
    });

    it('seeds users', () => {
      return db.users.findOne({ email: 'demo@email.com' }).then((user) => {
        expect(user).to.have.property('id');
        expect(user).to.have.property('email', 'demo@email.com');
        expect(user).to.have.property('passwordHash');
      });
    });

  });

  describe('.drop', () => {

    beforeEach(() => {
      return db.seed();
    });

    it('removes all collections', () => {
      return db.drop().then(() => {
        return db.contacts.find();
      })
      .then((contacts) => {
        expect(contacts).to.have.length(0);
      })
      .then(() => {
        return db.contacts.insertOne({ email: 'test@email.com' });
      })
      .then(() => {
        return db.contacts.find().then((contacts) => {
          expect(contacts).to.have.length(1);
          expect(contacts[0]).to.have.property('id', 1);
          expect(contacts[0]).to.have.property('email', 'test@email.com');
        });
      });
    });

  });

});
