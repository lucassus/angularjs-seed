const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

const config = require('./config');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json());

// TODO use `app.get('env')`
if (config.env !== 'test') {
  app.use(logger('short'));
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
