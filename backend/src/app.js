
const express = require('express');

const app = express();

const router = require('./routes/router');

app.use(express.json());
app.use('/my-system', router)

module.exports = app;
