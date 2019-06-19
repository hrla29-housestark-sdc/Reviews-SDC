require('newrelic');
const express = require('express');
const parser = require('body-parser');
const database = require('../../database/postgres/index.js');
const router = require('./router.js');

const app = express();
const port = 3004;
const path = require('path');

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.use('/api', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
})