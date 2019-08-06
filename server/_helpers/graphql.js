const graphqlHTTP = require('express-graphql');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const schema = require('../data/schema');

const graph_http = graphqlHTTP((req, res) => ({
  schema,
  context: { login: req.login.bind(req), user: req.user },
  graphiql: process.env.NODE_ENV !== 'production'
}));

module.exports = graph_http;
