const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(require('body-parser').json());

if (app.get('env') !== 'production') {
  app.use('/api/seed', require('./api/seed'));
}

app.use('/api/contacts', require('./api/contacts'));

if (app.get('env') === 'production') {
  app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}

module.exports = app;
