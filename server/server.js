require('rootpath')();
require('pretty-error').start();
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

// Start MongoDB and Express
const initDBConnection = require('./_helpers/db').initDBConnection;
initDBConnection(process.env.MONGO_URI, () => {
  const port = process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000;
  app.listen(port, () => {
    app.use('/graphql', require('./_helpers/graphql'));
    if (0) {
      const generate_fake_data = require('./faker');
    }

    console.info(`Server listening on port ${port}`);
  });
});
