const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema(
  {
    _userId: {
      type: ObjectId,
      index: true,
      required: '_VALID_USER',
    },
    _gigId: {
      type: ObjectId,
      index: true,
      required: '_VALID_GIG',
    },
    score: {
      type: Number,
      required: '_AT_LEAST_ONE_STAR',
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model('Rating', schema);

// -----------------------------------------------------------
// GraphQL declarations
// -----------------------------------------------------------
const { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLNonNull } = require('graphql');

const fields = {
  _id: { type: GraphQLNonNull(GraphQLID) },
  _userId: { type: GraphQLNonNull(GraphQLID) },
  _gigId: { type: GraphQLNonNull(GraphQLID) },
  score: { type: GraphQLNonNull(GraphQLInt) },
  comment: { type: GraphQLString },
};

const RatingType = new GraphQLObjectType({
  name: 'Rating',
  description: 'Rating type definition',
  fields,
});

module.exports = { fields, Rating, RatingType };
