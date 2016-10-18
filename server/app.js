const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(require('body-parser').json());

if (process.env.NODE_ENV !== 'production') {
  app.use('/api/seed', require('./api/seed'));
}

app.use('/api/contacts', require('./api/contacts'));

module.exports = app;
