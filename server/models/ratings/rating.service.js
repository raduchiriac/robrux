const Rating = require('./rating.model').Rating;

const addRating = async params => {
  const rating = new Rating(params);
  const ratingResult = await rating.save();
  return ratingResult;
};

const addManyRatings = async ratings => {
  const ratingResult = await Rating.insertMany(ratings);
  return ratingResult;
};

module.exports = {
  addRating,
  addManyRatings,
};
