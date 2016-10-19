const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const _ = require('lodash');

const config = require('../config');
const db = require('../db');

function checkPassword(password, passwordHash) {
  const compare = Promise.promisify(bcrypt.compare);
  return compare(password, passwordHash);
}

router.post('/', (req, res) => {
  const { email, password } = req.body;

  db.users.findOne({ email }).then((user) => {
    return checkPassword(password, user.passwordHash).then((success) => {
      if (success) {
        res.json({
          token: jwt.sign(_.pick(user, ['id', 'email']), config.secret, {
            expiresIn: '7 days'
          })
        });
      } else {
        return Promise.reject('invalid password');
      }
    });
  }).catch(() => {
    res.sendStatus(422);
  });
});

module.exports = router;
