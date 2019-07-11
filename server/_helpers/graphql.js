const graphqlHTTP = require('express-graphql');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const gigQueries = require('../gigs/gig.graphql.queries');
const gigMutations = require('../gigs/gig.graphql.mutations');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...gigQueries,
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...gigMutations,
    }),
  }),
});

const graph_http = graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
});

module.exports = graph_http;
