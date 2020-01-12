const { GraphQLClient } = require('graphql-request');
const client = new GraphQLClient(
  `${process.env.HOSTNAME}:${Number(process.env.PORT) ? process.env.PORT : ''}${process.env.GRAPHQL_ROUTE}`,
  {}
);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const News = require('./models/news/news.model').News;
let news = [];
const Gig = require('./models/gigs/gig.model').Gig;
let gigs = [];
const User = require('./models/users/user.model').User;
let users = [];

const getCleanupPromise = collection => collection.deleteMany({}).exec();

const createInsertQueries = (query, callback, amount) => {
  let promises = [];
  for (let i = 0; i < amount; i++) {
    promises.push(client.request(query()).then(callback));
  }
  return promises;
};

async function runThroughCollections(iterable, asyncBlock) {
  for (let item of iterable) {
    await asyncBlock(item);
  }
}

const cleanup = async () => {
  const collections = [News, Gig];
  await runThroughCollections(collections, async collection => {
    const cleanupResult = await getCleanupPromise(collection);
    console.log(`> ${collection.collection.collectionName} collection deleted: ${cleanupResult.deletedCount}`);
  });
  console.log('Cleanup completed…');
};

const mock = async () => {
  console.log('Inserting mock data…');
  const promises = [
    ...createInsertQueries(
      require('./models/news/news.graphql.strings').NEWS_CREATE_FAKE,
      data => {
        news.push(data.createNews._id);
      },
      2
    ),
    ...createInsertQueries(
      require('./models/gigs/gig.graphql.strings').GIG_CREATE_FAKE,
      data => {
        gigs.push(data.createGig._id);
      },
      222
    ),
  ];
  await Promise.all(promises);
};

const relationships = () => {
  console.log('Creating relationships…');
};

cleanup()
  .then(mock)
  .then(relationships)
  .then(() => {
    console.log('[⇣] Seeding succeeded. Exiting…');
    process.exit();
  })
  .catch(err => {
    console.log(err);
  });
