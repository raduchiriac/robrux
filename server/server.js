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

app.use('/graphql', require('./_helpers/graphql'));

/*
// Faker ENGINE
const { GraphQLClient } = require('graphql-request');

const client = new GraphQLClient('http://localhost:4000/graphql', {
  // headers: {
  //   Authorization: 'Bearer my-jwt-token',
  // },
});

const query = require('./gigs/gig.graphql.strings').GIG_CREATE();

client.request(query).then(data => console.log(data));
//*/

// start server
const port = process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000;
app.listen(port, function() {
  console.info(`Server listening on port ${port}`);
});
