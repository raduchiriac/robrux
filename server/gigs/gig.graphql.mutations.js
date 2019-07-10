const { GraphQLNonNull, GraphQLInputObjectType, GraphQLString } = require('graphql');
const GigType = require('./gig.model').GigType;
const GigService = require('./gig.service');

const GigInputType = new GraphQLInputObjectType({
  name: 'GigInputType',
  description: 'Gig payload definition',
  fields: () => ({
    _userId: {
      type: GraphQLNonNull(GraphQLString),
    },
    _providerName: {
      type: GraphQLNonNull(GraphQLString),
    },
  }),
});

const gigMutations = {
  createGig: {
    type: GigType,
    description: 'Create a new Gig',
    args: {
      input: {
        type: new GraphQLNonNull(GigInputType),
      },
    },
    resolve: async (rootValue, { input }) => {
      return await GigService.createGig(input);
    },
  },
};

module.exports = gigMutations;
