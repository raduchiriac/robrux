const mongoose = require('mongoose');
const latinize = require('latinize');
const Schema = mongoose.Schema;
const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLObjectType } = require('graphql');

const strippedString = str => str.replace(/(<([^>]+)>)/gi, '');

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
  this.excerpt = strippedString(this.richContent).substring(0, 100) + '…';
  // TODO: Convert the Markdown to richContent
  // TODO: Send a newsletter with this news
  next();
});

const News = mongoose.model('News', schema);

const fields = {
  _id: { type: GraphQLID },
  title: { type: GraphQLNonNull(GraphQLString) },
  slug: { type: GraphQLString },
  excerpt: { type: GraphQLString },
  content: { type: GraphQLString },
  richContent: { type: GraphQLString },
  images: { type: GraphQLList(GraphQLString) },
  status: { type: GraphQLString },
};

const NewsType = new GraphQLObjectType({
  name: 'News',
  description: 'News type definition',
  fields: fields,
});

module.exports = { News, NewsType, fields };
