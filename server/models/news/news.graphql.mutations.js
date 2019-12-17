// File used for GraphQL mutations (DB Updates)
const { GraphQLNonNull, GraphQLInputObjectType } = require('graphql');
const GigType = require('../gigs/gig.model').GigType;
const GigService = require('../gigs/gig.service');

const GigInputType = new GraphQLInputObjectType({
  name: 'GigInputType',
  description: 'Gig payload definition',
  fields: require('../gigs/gig.model').fieldsInput,
});

const gigMutations = {
  updateRating: { type: GigType },
  updateProvider: { type: GigType },
  createGig: {
    type: GigType,
    description: 'Create a new Gig',
    args: {
      input: {
        type: new GraphQLNonNull(GigInputType),
      },
    },
    resolve: async (rootValue, { input }, context) => {
      return await GigService.createGig(input);
    },
  },
};

module.exports = gigMutations;
