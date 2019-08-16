const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

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

const GRAPHQL_PLAYGROUND_CONFIG = {
  settings: {
    'editor.cursorShape': 'line',
    'editor.fontSize': 12,
    'editor.reuseHeaders': true,
    'editor.theme': 'light',
    'schema.polling.interval': 10 * 1000,
  },
};

const context = ({ req }) => {
  // get the user token from the headers
  const token = req.headers.authorization || '';

  // try to retrieve a user with the token
  // const user = getUser(token);
  const user = {};

  // add the user to the context
  // optionally block the user
  // we could also check user roles/permissions here
  if (!user) throw new AuthenticationError('You must be logged in');
  return { user };
};

const apollo = new ApolloServer({
  schema,
  context,
  playground: process.env.NODE_ENV === 'production' ? false : GRAPHQL_PLAYGROUND_CONFIG,
});

module.exports = apollo;
