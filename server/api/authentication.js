const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const _ = require('lodash');

const config = require('../config');
const db = require('../db');

function checkPassword(password, passwordHash) {
  const compare = Promise.promisify(bcrypt.compare);
  return compare(password, passwordHash).then((success) => {
    if (success) {
      return Promise.resolve(true);
    } else {
      return Promise.reject(true);
    }
  });
}

router.post('/', (req, res) => {
  const { email, password } = req.body;

  db.users.findOne({ email }).then((user) => {
    const { passwordHash } = user;

    return checkPassword(password, passwordHash).then(() => {
      const data = _.pick(user, ['id', 'email']);

      const token = jwt.sign(data, config.secret, {
        expiresIn: '7 days'
      });

      res.json({ token });
    });
  }).catch(() => {
    res.sendStatus(422);
  });
});

module.exports = router;
