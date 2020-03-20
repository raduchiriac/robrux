const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema(
  {
    _userId: {
      type: ObjectId,
      index: true,
      ref: 'User',
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
const TimestampType = require('../../_helpers/utils').TimestampType;
const fields_user = require('../users/user.model').fields;

const RatingUserTypeOutput = new GraphQLObjectType({
  name: 'RatingUserTypeOutput',
  fields: fields_user,
});

const fields = {
  _id: { type: GraphQLID },
  _userId: { type: GraphQLNonNull(GraphQLID) },
  _gigId: { type: GraphQLNonNull(GraphQLID) },
  score: { type: GraphQLNonNull(GraphQLInt) },
  comment: { type: GraphQLString },
  createdAt: { type: TimestampType },
};

const RatingType = new GraphQLObjectType({
  name: 'Rating',
  description: 'Rating type definition',
  fields,
});

module.exports = { fields, Rating, RatingType };
