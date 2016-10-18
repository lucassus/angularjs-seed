const Promise = require('bluebird');
const faker = require('faker');
const _ = require('lodash');

const Collection = require('./collection');

class Db {

  constructor() {
    this.contacts = new Collection();
  }

  seed(n = 20) {
    faker.seed(667);

    return this.drop().then(() => {
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
    });
  }

  drop() {
    return Promise.all([
      this.contacts.drop()
    ]);
  }

}

module.exports = new Db();
