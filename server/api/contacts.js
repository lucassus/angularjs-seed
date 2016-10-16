const router = require('express').Router();
const db = require('../db');

function parseId(req) {
  const { id } = req.params;
  return parseInt(id);
}

router.get('/', (req, res) => {
  db.contacts.find().then((contacts) => {
    res.json({ contacts });
  });
});

router.get('/validate-email', (req, res) => {
  const { id, email } = req.query;

  db.contacts.findOne({ email }).then((contact) => {
    if (id) {
      return parseInt(id) !== contact.id;
    }

    return true;
  }).catch(() => {
    return false;
  }).then((taken) => {
    res.json({ taken });
  });
});

router.post('/', (req, res) => {
  const data = req.body;

  db.contacts.insertOne(data).then((contact) => {
    res.json(contact);
  });
});

router.get('/:id', (req, res) => {
  const id = parseId(req);

  db.contacts.findOne({ id }).then((contact) => {
    res.json(contact);
  }).catch(() => {
    res.sendStatus(404);
  });
});

router.put('/:id', (req, res) => {
  const id = parseId(req);
  const data = req.body;

  db.contacts.updateOne({ id }, data).then((contact) => {
    res.json(contact);
  }).catch(() => {
    res.sendStatus(404);
  });
});

router.delete('/:id', (req, res) => {
  const id = parseId(req);

  db.contacts.deleteOne({ id }).then(() => {
    res.sendStatus(200);
  }).catch(() => {
    res.sendStatus(404);
  });
});

module.exports = router;
