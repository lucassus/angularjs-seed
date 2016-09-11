const express = require('express');
const faker = require('faker');
const _ = require('lodash');

const app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname));

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
    res.send(404);
  }
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
