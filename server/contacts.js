const Promise = require('bluebird');
const _ = require('lodash');
const faker = require('faker');

let lastId = 0;

function nextId() {
  return ++lastId;
}

let contacts = [];

function seed(n = 20) {
  faker.seed(667);

  // Delete all contacts
  contacts.splice(0, contacts.length);

  _.times(n, () => {
    contacts.push({
      id: nextId(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    });
  });
}

function find() {
  return Promise.resolve(contacts);
}

function findOne(query) {
  const contact = _.find(contacts, query);

  if (contact) {
    return Promise.resolve(contact);
  } else {
    return Promise.reject();
  }
}

function insertOne(data) {
  const contact = _.extend({}, data, { id: nextId() });
  contacts.push(contact);

  return Promise.resolve(contact);
}

function updateOne(query, data) {
  return findOne(query).then((contact) => {
    return _.extend(contact, data);
  });
}

function deleteOne(query) {
  return findOne(query).then((contact) => {
    const index = _.findIndex(contacts, contact);
    contacts.splice(index, 1);

    return Promise.resolve(index);
  });
}

module.exports = { seed, find, findOne, insertOne, updateOne, deleteOne };
