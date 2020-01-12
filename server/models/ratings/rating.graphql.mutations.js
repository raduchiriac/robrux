const { GraphQLNonNull, GraphQLString, GraphQLInputObjectType } = require('graphql');
const RatingType = require('./rating.model').RatingType;
const RatingService = require('./rating.service');

const RatingInputType = new GraphQLInputObjectType({
  name: 'GigInRatingInputTypeputType',
  description: 'Rating payload definition',
  fields: require('./rating.model').fields,
});

const ratingMutations = {
  addRating: {
    type: RatingType,
    args: {
      input: {
        type: new GraphQLNonNull(RatingInputType),
      },
    },
    resolve: async (rootValue, { input }, context) => {
      return await RatingService.addRating(input);
    },
  },
  updateRating: {
    type: RatingType,
    args: {
      input: {
        type: new GraphQLNonNull(RatingInputType),
      },
    },
    resolve(parent, args) {
      return false;
    },
  },
  deleteRating: {
    type: RatingType,
    args: { id: { type: GraphQLNonNull(GraphQLString) } },
    resolve(parent, args) {
      return false;
    },
  },
};

module.exports = ratingMutations;
