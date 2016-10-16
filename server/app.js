const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/api/!seed', require('./api/seed'));
app.use('/api/contacts', require('./api/contacts'));

module.exports = app;
