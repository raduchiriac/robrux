const { ApolloServer, AuthenticationError, PubSub } = require('apollo-server-express');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const userQueries = require('../models/users/user.graphql.queries');
const userMutations = require('../models/users/user.graphql.mutations');

const gigQueries = require('../models/gigs/gig.graphql.queries');
const gigMutations = require('../models/gigs/gig.graphql.mutations');

const newsQueries = require('../models/news/news.graphql.queries');
const newsMutations = require('../models/news/news.graphql.mutations');

const ratingQueries = require('../models/ratings/rating.graphql.queries');
const ratingMutations = require('../models/ratings/rating.graphql.mutations');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...userQueries,
      ...gigQueries,
      ...ratingQueries,
      ...newsQueries,
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...userMutations,
      ...gigMutations,
      ...ratingMutations,
      ...newsMutations,
    }),
  }),
});

const context = ({ req, res, connection }) => {
  if (connection) {
    // Check connection for metadata
    // console.log(
    //   '🆖[Apollo context] There is a connection:',
    //   Object.keys(connection),
    //   'connection.context:',
    //   Object.keys(connection.context)
    // );
    return connection.context;
  } else {
    // console.log('🆖[Apollo context] no connection', req.headers);
    return { req, res };
  }
};

const formatError = err => {
  // Don't give the specific errors to the client.
  if (err.message.startsWith('Database Error: ')) {
    return new Error('Internal server error');
  }
  // Otherwise return the original error.
  return err;
};

const GRAPHQL_PLAYGROUND_CONFIG = {
  settings: {
    'editor.cursorShape': 'line',
    'editor.fontSize': 12,
    'editor.reuseHeaders': true,
    'editor.theme': 'light',
    'request.credentials': 'include',
    'schema.polling.interval': 10 * 1000,
  },
};

const apollo = new ApolloServer({
  schema,
  context,
  formatError,
  onConnect: async (params, socket, context) => {
    // console.log('[>] onConnect', params, socket, context);
  },
  onDisconnect: (socket, context) => {
    // console.log('[x] onDisconnect', socket, context);
  },
  tracing: false,
  playground: process.env.NODE_ENV === 'production' ? false : GRAPHQL_PLAYGROUND_CONFIG,
});

module.exports = apollo;
