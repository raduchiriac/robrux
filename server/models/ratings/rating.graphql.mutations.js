const { GraphQLNonNull, GraphQLString, GraphQLInputObjectType } = require('graphql');
const RatingType = require('./rating.model').RatingType;

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
    resolve(parent, args) {
      // const rating = new Rating(args);
      // return rating.save();
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
      // return Rating.findByIdAndUpdate(args.id, args);
    },
  },
  deleteRating: {
    type: RatingType,
    args: { id: { type: GraphQLNonNull(GraphQLString) } },
    resolve(parent, args) {
      // return Rating.findByIdAndRemove(args.id);
    },
  },
};

module.exports = ratingMutations;
