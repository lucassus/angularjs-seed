const router = require('express').Router();
const db = require('../db');

router.post('/', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendStatus(404);
  } else {
    db.seed().then(() => {
      res.sendStatus(200);
    });
  }
});

module.exports = router;
