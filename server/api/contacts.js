const router = require('express').Router();
const db = require('../db');

router.param('id', (req, res, next, id) => {
  id = parseInt(id);

  db.contacts.findOne({ id }).then((contact) => {
    req.contact = contact;
    next();
  }).catch(() => {
    res.sendStatus(404);
  });
});

router.get('/', (req, res) => {
  db.contacts.find().then((contacts) => {
    res.json({ contacts });
  });
});

router.post('/', (req, res) => {
  const data = req.body;

  db.contacts.insertOne(data).then((contact) => {
    res.json(contact);
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

router.get('/:id', (req, res) => {
  res.json(req.contact);
});

router.put('/:id', (req, res) => {
  const { id } = req.contact;
  const data = req.body;

  db.contacts.updateOne({ id }, data).then((contact) => {
    res.json(contact);
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.contact;

  db.contacts.deleteOne({ id }).then(() => {
    res.sendStatus(200);
  });
});

module.exports = router;
