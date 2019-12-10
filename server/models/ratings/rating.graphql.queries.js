// File used for GraphQL quries (select, limit, sort)
const { GraphQLList, GraphQLString } = require('graphql');
const RatingType = require('./rating.model').RatingType;

const ratingQueries = {
  ratingsByGig: {
    type: new GraphQLList(RatingType),
    args: { _gigId: { type: GraphQLString } },
    resolve(parent, args) {
      return [];
    },
  },
  ratingsByUser: {
    type: RatingType,
    args: { _userId: { type: GraphQLString } },
    resolve(parent, args) {
      return [];
    },
  },
};

module.exports = ratingQueries;
