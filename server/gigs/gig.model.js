const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  _userId: { type: ObjectId, unique: true, required: true },
  _providerName: { type: String },
  _rating: { type: Number },
  title: { type: String },
  image: { type: [String] },
  price: { type: Number }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Gig", schema);
