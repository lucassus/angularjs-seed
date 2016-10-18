const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(require('body-parser').json());
app.use(morgan('short'));

if (process.env.NODE_ENV !== 'production') {
  app.use('/api/seed', require('./api/seed'));
}

app.use('/api/contacts', require('./api/contacts'));

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
