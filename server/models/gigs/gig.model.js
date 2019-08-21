const mongoose = require('mongoose');
const latinize = require('latinize');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLInputObjectType,
} = require('graphql');

// Read more about types here https://mongoosejs.com/docs/schematypes.html
const schema = new Schema({
  _userId: { type: ObjectId, required: true },
  _providerName: { type: String },
  _rating: { type: Number, index: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  validUntil: { type: Date },
  title: { type: String, required: true },
  slug: { type: String, index: true },
  description: { type: String },
  images: { type: [String] },
  price: { type: Number },
  status: { type: String, required: true, enum: ['processing', 'valid', 'rejected', 'expired'], index: true },
  statusInformation: { type: String },
  tags: { type: [String], index: true },
  categories: { type: [String] },
  location: {
    address: { type: String },
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number] },
  },
});

// Create "text" Indexes
schema.index(
  {
    title: 'text',
    description: 'text',
    tags: 'text',
  },
  {
    weights: {
      title: 5,
      description: 1,
      tags: 6,
    },
  }
);

schema.pre('save', function(next) {
  this.slug = encodeURI(
    latinize(this.title)
      .replace(/ /g, '-')
      .toLowerCase()
  );
  next();
});

const Gig = mongoose.model('Gig', schema);

// -----------------------------------------------------------
// GraphQL declarations
// -----------------------------------------------------------
const fields = {
  _id: { type: GraphQLID },
  _userId: { type: GraphQLNonNull(GraphQLID) },
  _providerName: { type: GraphQLString },
  _rating: { type: GraphQLFloat },
  title: { type: GraphQLString },
  slug: { type: GraphQLString },
  description: { type: GraphQLString },
  images: { type: GraphQLList(GraphQLString) },
  tags: { type: GraphQLList(GraphQLString) },
  status: { type: GraphQLString },
  price: { type: GraphQLInt },
};

const fields_location = {
  address: { type: GraphQLString },
  type: { type: GraphQLString },
  coordinates: { type: GraphQLList(GraphQLFloat) },
};

// Nested fields needed for Queries
const GigLocationTypeOutput = new GraphQLObjectType({
  name: 'GigLocationOutput',
  fields: fields_location,
});

// Nested fields needed for Mutations
const GigLocationTypeInput = new GraphQLInputObjectType({
  name: 'GigLocationInput',
  fields: fields_location,
});

// Used to create the regular Query {} fields
const fieldsOutput = Object.assign({}, fields, {
  location: {
    type: GigLocationTypeOutput,
  },
});

// Used to create the Mutation {} fields
const fieldsInput = Object.assign({}, fields, {
  location: {
    type: GigLocationTypeInput,
  },
});

const GigType = new GraphQLObjectType({
  name: 'Gig',
  description: 'Gig type definition',
  fields: fieldsOutput,
});

module.exports = { Gig, GigType, fieldsInput };
