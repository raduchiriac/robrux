const mongoose = require('mongoose');
const { GraphQLClient } = require('graphql-request');
const randomFromArray = require('./_helpers/utils').randomFromArray;

const client = new GraphQLClient(
  `${process.env.HOSTNAME}:${Number(process.env.PORT) ? process.env.PORT : ''}${process.env.GRAPHQL_ROUTE}`,
  {
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      // TODO: Authorize mutations
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

const createInsertQueries = (query, callback, amount, data = {}) => {
  let promises = [];
  for (let i = 0; i < amount; i++) {
    let dataToSend = data;
    if (typeof data === 'function') {
      dataToSend = data();
    }
    promises.push(client.request(query(dataToSend)).then(callback));
  }
  return promises;
};

async function runThroughCollections(iterable, asyncBlock) {
  for (let item of iterable) {
    await asyncBlock(item);
  }
}

const cleanup = async () => {
  const collections = [News, Gig, Rating, User];
  await runThroughCollections(collections, async collection => {
    const cleanupResult = await getCleanupPromise(collection);
    // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
    console.log(`> deleted: \x1b[35m${cleanupResult.deletedCount}\x1b[0m ${collection.collection.collectionName}`);
  });
};

const mockTheUsers = async () => {
  console.log('Inserting users…');
  const promises = [
    ...createInsertQueries(
      require('./models/users/user.graphql.strings').USER_CREATE_FAKE,
      data => {
        users.push(data.register._id);
      },
      1,
      { email: 'de@de.de' }
    ),
    ...createInsertQueries(
      require('./models/users/user.graphql.strings').USER_CREATE_FAKE,
      data => {
        users.push(data.register._id);
      },
      66
    ),
  ];
  await Promise.all(promises);
};

const mockTheRest = async () => {
  console.log('Inserting gigs, news…');
  const promises = [
    ...createInsertQueries(
      require('./models/news/news.graphql.strings').NEWS_CREATE_FAKE,
      data => {
        news.push(data.createNews._id);
      },
      3
    ),
    ...createInsertQueries(
      require('./models/gigs/gig.graphql.strings').GIG_CREATE_FAKE,
      data => {
        gigs.push({ _id: data.createGig._id, _userId: data.createGig._userId._id });
      },
      100,
      () => ({ userId: randomFromArray(users) })
    ),
  ];
  await Promise.all(promises);
};

const myFakeRatings = [];
const mockWithDependecies = async () => {
  console.log('Inserting ratings…');
  const { addManyRatings } = require('./models/ratings/rating.service');
  gigs.forEach(gig => {
    const HOW_MANY_RATINGS = Math.round(Math.random() * 10) + 1;
    for (let i = 0; i < HOW_MANY_RATINGS; i++) {
      // INFO: user._id should not be able to rate his own gig
      // but it's too complicated to check that here
      const userId = randomFromArray(users);
      myFakeRatings.push(
        require('./models/ratings/rating.graphql.strings').FAKE_RATING_DATA({ gigId: gig._id, userId })
      );
    }
  });
  ratings = await addManyRatings(myFakeRatings);
};

const buildRelationships = async () => {
  console.log('Creating relationships between gigs and ratings…');
  const updateGig = require('./models/gigs/gig.service').updateGig;
  let mutations = [];
  gigs.forEach(gig => {
    const filteredRatings = ratings.filter(rating => gig._id === rating._gigId + '');
    mutations.push(
      new Promise((resolve, reject) => {
        resolve(
          updateGig(
            { _id: gig._id },
            {
              _ratings: filteredRatings.map(rating => rating._id),
              _rating: filteredRatings.reduce((total, current) => total + current.score, 0) / filteredRatings.length,
            }
          )
        );
      })
    );
  });
  await Promise.all(mutations);
  // TODO: Mutate the users._gigs with their respective gigs id
  console.log('Creating relationships between gigs and users…');
  const updateUser = require('./models/users/user.service').updateUser;
  mutations.length = 0;
  const dataToMutate = gigs.reduce((acc, curr) => {
    if (!acc[curr._userId]) acc[curr._userId] = [];
    acc[curr._userId].push(curr._id);
    return acc;
  }, {});
  Object.keys(dataToMutate).forEach(key => {
    mutations.push(
      new Promise((resolve, reject) => {
        resolve(
          updateUser(
            { _id: key },
            {
              _gigs: dataToMutate[key],
            }
          )
        );
      })
    );
  });
  await Promise.all(mutations);
};

cleanup()
  .then(mockTheUsers)
  .then(mockTheRest)
  .then(mockWithDependecies)
  .then(buildRelationships)
  .then(() => {
    console.log('\x1b[35m[⇣]\x1b[0m Seeding succeeded. Exiting…');
    process.exit();
  })
  .catch(err => {
    console.log(err);
  });
