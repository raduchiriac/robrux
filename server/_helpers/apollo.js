const { ApolloServer, AuthenticationError, PubSub } = require('apollo-server-express');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const jwt = require('jsonwebtoken');

const userQueries = require('../models/users/user.graphql.queries');
const userMutations = require('../models/users/user.graphql.mutations');

const gigQueries = require('../models/gigs/gig.graphql.queries');
const gigMutations = require('../models/gigs/gig.graphql.mutations');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...userQueries,
      ...gigQueries,
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...userMutations,
      ...gigMutations,
    }),
  }),
});

const context = ({ req, res, connection }) => {
  if (connection) {
    // check connection for metadata
    return connection.context;
  } else {
    const token = req.headers.token || '';

    return { req, res, token };
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
    'schema.polling.interval': 10 * 1000,
  },
};

const apollo = new ApolloServer({
  schema,
  context,
  onConnect: async (params, socket, context) => {
    // throw new Error('User is not authenticated');
  },
  onDisconnect: (socket, context) => {},
  formatError,
  playground: process.env.NODE_ENV === 'production' ? false : GRAPHQL_PLAYGROUND_CONFIG,
});

module.exports = apollo;
