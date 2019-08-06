const graphqlHTTP = require('express-graphql');
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

const graph_http = graphqlHTTP((req, res) => ({
  schema,
  context: { login: req.login.bind(req), user: req.user },
  graphiql: process.env.NODE_ENV !== 'production',
}));

module.exports = graph_http;
