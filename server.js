const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = process.env.PORT || 9090;
app.listen(port, () => {
  console.log('Node app is running on port', port);
});

// Fake in-memory database
const db = {
  contacts: require('./server/contacts')
};

// Initially seed the fake db
db.contacts.seed();

function parseId(req) {
  return parseInt(req.param('id'));
}

app.get('/api/contacts', (req, res) => {
  db.contacts.find().then((contacts) => {
    res.json({ contacts });
  });
});

app.post('/api/contacts', (req, res) => {
  const data = req.body;

  db.contacts.insertOne(data).then((contact) => {
    res.json(contact);
  });
});

app.get('/api/contacts/:id', (req, res) => {
  const id = parseId(req);

  db.contacts.findOne({ id }).then((contact) => {
    res.json(contact);
  }).catch(() => {
    res.sendStatus(404);
  });
});

app.put('/api/contacts/:id', (req, res) => {
  const id = parseId(req);
  const data = req.body;

  db.contacts.updateOne({ id }, data).then((contact) => {
    res.json(contact);
  }).catch(() => {
    res.sendStatus(422);
  });
});

app.delete('/api/contacts/:id', (req, res) => {
  const id = parseId(req);

  db.contacts.deleteOne({ id }).then(() => {
    res.sendStatus(200);
  }).catch(() => {
    res.sendStatus(404);
  });
});
