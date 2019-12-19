const mongoose = require('mongoose');
const latinize = require('latinize');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const markdownConverter = require('../../_helpers/utils').markdownConverter;
const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLInputObjectType,
} = require('graphql');

// Read more about types here https://mongoosejs.com/docs/schematypes.html
const schema = new Schema(
  {
    _userId: { type: ObjectId, required: true },
    _providerName: { type: String },
    _providerAvatar: { type: String },
    _rating: { type: Number, index: true },
    _subscription: { type: String },
    title: { type: String, required: true, trim: true },
    slug: { type: String, index: true },
    description: { type: String, trim: true },
    richDescription: { type: String },
    images: { type: [String] },
    price: { type: Number },
    status: {
      type: String,
      required: true,
      default: 'processing',
      enum: ['processing', 'valid', 'rejected', 'expired'],
      index: true,
    },
    featured: { type: Boolean, index: true },
    statusInformation: { type: String },
    tags: { type: [String] },
    categories: { type: [Number] },
    location: {
      address: { type: String },
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number] },
    },
  },
  // Read more here: https://mongoosejs.com/docs/guide.html#options
  { timestamps: true }
);

// Create "text" Indexes
schema.index(
  {
    status: 'valid',
    title: 'text',
    description: 'text',
    tags: 'text',
  },
  {
    // You can do: db.collection.dropIndex("MyTextIndex")
    name: 'MyTextIndex',
    default_language: 'romanian',
    weights: {
      title: 5,
      description: 2,
      tags: 4,
    },
  }
);

// INFO: Read about other hooks https://mongoosejs.com/docs/middleware.html
schema.pre('save', function(next) {
  this.slug = encodeURI(
    latinize(this.title)
      .replace(/ /g, '-')
      .toLowerCase()
  );
  this.richDescription = markdownConverter.makeHtml(this.description);
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
  _providerAvatar: { type: GraphQLString },
  _rating: { type: GraphQLFloat },
  _subscription: { type: GraphQLString },
  title: { type: GraphQLNonNull(GraphQLString) },
  slug: { type: GraphQLString },
  description: { type: GraphQLString },
  richDescription: { type: GraphQLString },
  images: { type: GraphQLList(GraphQLString) },
  categories: { type: GraphQLList(GraphQLInt) },
  tags: { type: GraphQLList(GraphQLString) },
  status: { type: GraphQLString },
  price: { type: GraphQLInt },
  featured: { type: GraphQLBoolean },
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
