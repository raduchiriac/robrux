const mongoose = require('mongoose');
const { GraphQLClient } = require('graphql-request');
const client = new GraphQLClient(
  `${process.env.HOSTNAME}:${Number(process.env.PORT) ? process.env.PORT : ''}${process.env.GRAPHQL_ROUTE}`,
  {
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      // authorization: 'Bearer MY_TOKEN',
    },
  }
);
mongoose.Promise = global.Promise;

const News = require('./models/news/news.model').News;
let news = [];
const Rating = require('./models/ratings/rating.model').Rating;
let ratings = [];
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
  const collections = [News, Gig, Rating];
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
      100
    ),
  ];
  await Promise.all(promises);
};

const mockWithDependecies = async () => {
  console.log('Inserting ratings…');
  const { addManyRatings } = require('./models/ratings/rating.service');
  const myFakeRatings = [];
  gigs.forEach(gig => {
    const LEN = Math.round(Math.random() * 10) + 1;
    for (let i = 0; i < LEN; i++) {
      myFakeRatings.push(require('./models/ratings/rating.graphql.strings').FAKE_RATING_DATA(gig));
    }
  });
  ratings = await addManyRatings(myFakeRatings);
};

const buildRelationships = async () => {
  console.log('Creating relationships…');
  const mutations = [];
  gigs.forEach(gig => {
    const filteredRatings = ratings.filter(rating => gig === rating._gigId + '');
    const dataToMutateGig = {
      id: gig,
      ratings: filteredRatings.map(rating => rating._id),
      _rating: filteredRatings.reduce((total, current) => total + current.score, 0) / filteredRatings.length,
    };
    mutations.push(dataToMutateGig);
  });
  // TODO: Mutate gigs.ratings based on ratings[].gigId and gigs._rating on average
};

cleanup()
  .then(mock)
  .then(mockWithDependecies)
  .then(buildRelationships)
  .then(() => {
    console.log('[⇣] Seeding succeeded. Exiting…');
    process.exit();
  })
  .catch(err => {
    console.log(err);
  });
