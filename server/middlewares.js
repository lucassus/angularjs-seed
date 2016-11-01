const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

const config = require('./config');
const db = require('./db');

function verityToken(token) {
  return Promise.promisify(jwt.verify)(token, config.secret)
    .then((decoded) => {
      const { id, email } = decoded;
      return db.users.findOne({ id, email });
    });
}

// TODO write decent tests for this middleware
module.exports.requireAuthorization = function(req, res, next) {
  const token = req.headers['x-access-token'];

  verityToken(token).then((user) => {
    req.currentUser = user;
    next();
  }).catch(() => {
    res.status(401).send({});
  });
};
