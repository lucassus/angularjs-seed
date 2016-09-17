const Promise = require('bluebird');
const faker = require('faker');
const _ = require('lodash');

const Collection = require('./collection');

module.exports = {
  contacts: new Collection(),

  seed(n = 20) {
    faker.seed(667);

    this.contacts.deleteMany();

    return Promise.all(_.times(n, () => {
      return this.contacts.insertOne({
        favourite: faker.random.boolean(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber()
      });
    }));
  }
};
