// File used for GraphQL quries (select, limit, sort)
const { GraphQLList, GraphQLInt, GraphQLString, GraphQLFloat } = require('graphql');
const GigService = require('./gig.service');
const GigType = require('./gig.model').GigType;

const gigQueries = {
  gigs: {
    type: GraphQLList(GigType),
    args: {
      limit: { type: GraphQLInt },
      sort: { type: GraphQLString },
      bbox: { type: GraphQLList(GraphQLList(GraphQLFloat)) },
    },
    resolve: async (root, args, context, info) => {
      // Limit of returned results, sort by a field ('rating' or '-rating'), coordinates bounding box
      const { limit = 0, sort = '', bbox = [] } = args;
      return await GigService.getAll(limit, sort, bbox);
    },
  },
  search: {
    type: GraphQLList(GigType),
    args: {
      string: { type: GraphQLString },
    },
    resolve: async (root, args, context, info) => {
      const { string } = args;
      return await GigService.fuzzySearch(string);
    },
  },
};

module.exports = gigQueries;
