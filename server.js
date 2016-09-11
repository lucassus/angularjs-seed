const express = require('express');
const faker = require('faker');
const _ = require('lodash');

const app = express();

app.use(express.static(__dirname));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Node app is running on port', port);
});

const contacts = _.times(20, () => {
  return {
    id: faker.random.uuid(),
    fistName: faker.name.firstName(),
    lastName: faker.name.lastName,
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  }
});

app.get('/api/contacts', (req, res) => {
  res.json({ contacts });
});

app.get('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const contact = _.find(contacts, { id });

  if (contact) {
    res.json(contact);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const index = _.findIndex(contacts, { id });

  if (index > -1) {
    contacts.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});