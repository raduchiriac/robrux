// File used for GraphQL quries (select, limit, sort)
const { GraphQLList, GraphQLInt, GraphQLString, GraphQLFloat } = require('graphql');
const GigService = require('./gig.service');
const GigType = require('./gig.model').GigType;

const gigQueries = {
  // Get Gigs in a bounding box
  gigs: {
    type: GraphQLList(GigType),
    args: {
      limit: { type: GraphQLInt },
      sort: { type: GraphQLString },
      searchingFor: { type: GraphQLString },
      bbox: { type: GraphQLList(GraphQLList(GraphQLFloat)) },
    },
    resolve: async (root, args, context, info) => {
      // Limit of returned results, sort by a field ('rating' or '-rating'), coordinates bounding box
      const { limit = 0, sort = '', bbox = [], searchingFor = '' } = args;
      return await GigService.getBboxGigs(limit, sort, bbox, searchingFor);
    },
  },
  oneGig: {
    // Give me on Gig
    type: GigType,
    args: {
      idOrSlug: { type: GraphQLString },
    },
    resolve: async (root, args, context, info) => {
      const { idOrSlug } = args;
      return await GigService.oneGig(idOrSlug);
    },
  },
  search: {
    // Search for Gigs with a term
    type: GraphQLList(GigType),
    args: {
      term: { type: GraphQLString },
    },
    resolve: async (root, args, context, info) => {
      const { term } = args;
      return await GigService.fuzzySearch(term);
    },
  },
};

module.exports = gigQueries;
