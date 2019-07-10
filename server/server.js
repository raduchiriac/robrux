require('rootpath')();
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const errorHandler = require('./_helpers/error-handler');

const app = express();
app.use(errorHandler);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/graphql', require('./_graphql'));

// start server
const port = process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000;
app.listen(port, function() {
  console.info(`Server listening on port ${port}`);
});
