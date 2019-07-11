const { GraphQLNonNull, GraphQLInputObjectType } = require('graphql');
const GigType = require('./gig.model').GigType;
const GigService = require('./gig.service');

const GigInputType = new GraphQLInputObjectType({
  name: 'GigInputType',
  description: 'Gig payload definition',
  fields: require('./gig.model').fieldsInput,
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
