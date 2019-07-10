const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// Read more about types here https://mongoosejs.com/docs/schematypes.html
const schema = new Schema({
  _userId: { type: ObjectId, unique: true, required: true },
  _providerName: { type: String },
  _rating: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  validUntil: { type: Date },
  title: { type: String },
  slug: { type: String },
  description: { type: String },
  description_short: { type: String },
  images: { type: [String] },
  price: { type: Number },
  tags: { type: [String] },
  location: {
    address: { type: String },
    geometry: {
      type: { type: String, default: 'Point' },
      coordinates: [[Number]],
    },
  },
});

schema.set('toJSON', { virtuals: true });

// GraphQL below

const { GraphQLID, GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLList, GraphQLFloat } = require('graphql');

const GigType = new GraphQLObjectType({
  name: 'Gig',
  description: 'Gig type definition',
  fields: {
    _id: { type: GraphQLID },
    _userId: { type: GraphQLID },
    _providerName: { type: GraphQLString },
    _rating: { type: GraphQLFloat },
    title: { type: GraphQLString },
    images: { type: GraphQLList(GraphQLString) },
    price: { type: GraphQLInt },
  },
});

module.exports = { Gig: mongoose.model('Gig', schema), GigType };
