const { GraphQLClient } = require('graphql-request');
const client = new GraphQLClient(`${process.env.HOSTNAME}:${process.env.PORT}${process.env.GRAPHQL_ROUTE}`, {});

// Seed some 20 Users
let users = [];

// Seed some 100 Gigs
const Gig = require('./models/gigs/gig.model').Gig;
// Cleanup...
let gigs = [];
Gig.deleteMany({}, async () => {
  for (let i = 0; i < 100; i++) {
    const query = require('./models/gigs/gig.graphql.strings').GIG_CREATE_FAKE();
    await client.request(query).then(data => gigs.push(data.createGig._id));
  }
});
