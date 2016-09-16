const Promise = require('bluebird');
const faker = require('faker');
const _ = require('lodash');

faker.seed(667);

module.exports = {
  contacts: require('./db/contacts'),

  seed(n = 20) {
    this.contacts.deleteMany();

    return Promise.all(_.times(n, () => {
      return this.contacts.insertOne({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber()
      });
    }));
  }
};
