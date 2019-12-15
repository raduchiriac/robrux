const mongoose = require('mongoose');
const latinize = require('latinize');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, index: true },
    excerpt: { type: String, trim: true },
    richContent: { type: String },
    images: { type: [String] },
    status: {
      type: String,
      required: true,
      default: 'live',
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
  next();
});

const News = mongoose.model('News', schema);

module.exports = { News };
