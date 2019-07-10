const { GraphQLList } = require('graphql');
const GigService = require('./gig.service');
const GigType = require('./gig.model').GigType;

const gigQueries = {
  gigs: {
    type: GraphQLList(GigType),
    resolve: async (root, args, context, info) => {
      return await GigService.getAll();
    },
  },
};

module.exports = gigQueries;
