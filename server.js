const express = require('express');
const path = require('path');

const db = require('./server/db');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

db.seed().then((contacts) => {
  console.log(`Database populated with ${contacts.length} contacts`);

  const port = process.env.PORT || 9090;
  app.listen(port, () => {
    console.log('Server is running on port', port);
  });
});

function parseId(req) {
  const { id } = req.params;
  return parseInt(id);
}

app.post('/api/!seed', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendStatus(404);
  } else {
    db.seed().then(() => {
      res.sendStatus(200);
    });
  }
});

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
