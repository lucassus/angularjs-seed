const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const faker = require('faker');
const _ = require('lodash');

const Collection = require('./db/collection');

class Db {

  constructor() {
    this.users = new Collection();
    this.contacts = new Collection();
  }

  seed() {
    faker.seed(667);

    return this.drop().then(() => {
      return Promise.all([
        this._seedUsers(),
        this._seedContacts()
      ]);
    });
  }

  _seedUsers() {
    const hashPassword = (password) => {
      const salt = bcrypt.genSaltSync(10);
      return Promise.promisify(bcrypt.hash)(password, salt);
    };

    return hashPassword('password').then((passwordHash) => {
      return this.users.insertOne({
        firstName: 'Admin',
        lastName: 'Adminowsky',
        email: 'demo@email.com',
        passwordHash
      });
    });
  }

  _seedContacts(n = 20) {
    return Promise.all(_.times(n, () => {
      const address = {
        country: faker.address.country(),
        town: faker.address.city(),
        zipCode: faker.address.zipCode(),
        street: faker.address.streetAddress(),
        location: {
          lon: faker.address.longitude(),
          lat: faker.address.latitude()
        }
      };

      return this.contacts.insertOne({
        favourite: faker.random.boolean(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        address
      });
    }));
  }

  drop() {
    return Promise.all([
      this.contacts.drop()
    ]);
  }

}

module.exports = new Db();
