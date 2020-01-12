const mongoose = require('mongoose');
const latinize = require('latinize');
const Schema = mongoose.Schema;
const strippedString = require('../../_helpers/utils').strippedString;
const markdownConverter = require('../../_helpers/utils').markdownConverter;
const TimestampType = require('../../_helpers/utils').TimestampType;

const schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, index: true },
    excerpt: { type: String, trim: true },
    content: { type: String, trim: true },
    richContent: { type: String },
    images: { type: [String] },
    status: {
      type: String,
      required: true,
      default: 'draft',
      enum: ['draft', 'live', 'archived', 'trashed'],
      index: true,
    },
  },
  // Read more here: https://mongoosejs.com/docs/guide.html#options
  { timestamps: true }
);

schema.pre('save', function(next) {
  this.slug = encodeURI(
    latinize(this.title)
      .replace(/ /g, '-')
      .toLowerCase()
  );
  this.richContent = markdownConverter.makeHtml(this.content);
  this.excerpt = strippedString(this.richContent).substring(0, 100) + '…';
  // TODO: Send a newsletter with this news
  next();
});

const News = mongoose.model('News', schema);

// -----------------------------------------------------------
// GraphQL declarations
// -----------------------------------------------------------
const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLObjectType } = require('graphql');

const fields = {
  _id: { type: GraphQLNonNull(GraphQLID) },
  title: { type: GraphQLNonNull(GraphQLString) },
  slug: { type: GraphQLString },
  excerpt: { type: GraphQLString },
  content: { type: GraphQLString },
  richContent: { type: GraphQLString },
  images: { type: GraphQLList(GraphQLString) },
  status: { type: GraphQLString },
  createdAt: { type: TimestampType },
};

const NewsType = new GraphQLObjectType({
  name: 'News',
  description: 'News type definition',
  fields: fields,
});

module.exports = { News, NewsType, fields };
