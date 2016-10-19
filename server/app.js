const express = require('express');
const morgan = require('morgan');
const path = require('path');

const config = require('./config');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(require('body-parser').json());

if (config.env !== 'test') {
  app.use(morgan('short'));
}

if (config.env !== 'production') {
  app.use('/api/seed', require('./api/seed'));
}

app.use('/api/authentication', require('./api/authentication'));
app.use('/api/contacts', require('./api/contacts'));

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
