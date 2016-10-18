const router = require('express').Router();
const db = require('../db');

router.post('/', (req, res) => {
  db.seed().then(() => {
    res.sendStatus(200);
  });
});

module.exports = router;
