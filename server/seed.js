const { GraphQLClient } = require('graphql-request');
const client = new GraphQLClient(`${process.env.HOSTNAME}:${process.env.PORT}${process.env.GRAPHQL_ROUTE}`, {});

// Two News
let news = [];
const News = require('./models/news/news.model').News;
// Cleanup...
News.deleteMany({}, async () => {
  for (let i = 0; i < 2; i++) {
    const query = require('./models/news/news.graphql.strings').NEWS_CREATE_FAKE();
    await client.request(query).then(data => news.push(data.createNews._id));
  }
});

// Seed some 20 Users
let users = [];

// Seed some 100 Gigs
const Gig = require('./models/gigs/gig.model').Gig;
let gigs = [];
// Cleanup...
Gig.deleteMany({}, async () => {
  for (let i = 0; i < 100; i++) {
    const query = require('./models/gigs/gig.graphql.strings').GIG_CREATE_FAKE();
    await client.request(query).then(data => gigs.push(data.createGig._id));
  }
});

console.log('[⇣] Seeding succeeded. Exiting…');
// TODO: Use Promises for the above inserts so you can gracefully exit below
// process.exit();
