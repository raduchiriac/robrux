const { ApolloServer } = require('apollo-server-express');
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
  },
};

const apollo = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV === 'production' ? false : GRAPHQL_PLAYGROUND_CONFIG,
});

module.exports = apollo;
