const Promise = require('bluebird');
const _ = require('lodash');
const faker = require('faker');

let lastId = 0;

function nextId() {
  return ++lastId;
}

function seed() {
  faker.seed(667);

  return _.times(20, () => {
    return {
      id: nextId(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    };
  });
}

const contacts = seed();

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

module.exports = { find, findOne, insertOne, updateOne, deleteOne };
