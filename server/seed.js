const { GraphQLClient } = require('graphql-request');
const client = new GraphQLClient(`${process.env.HOSTNAME}:${process.env.PORT}/graphql`, {});

// Seed some 100 Gigs
for (let i = 0; i < 100; i++) {
  const query = require('./models/gigs/gig.graphql.strings').GIG_CREATE_FAKE();
  client.request(query).then(data => console.log(data));
}
