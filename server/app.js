const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./api/seed')(app);
require('./api/contacts')(app);

module.exports = app;
