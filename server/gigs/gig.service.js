const Gig = require('./gig.model').Gig;

const createGig = async gigParams => {
  const gig = new Gig(gigParams);
  const gigResult = await gig.save();
  return gigResult;
};

const getAll = async (limit = 0, sort = {}) =>
  await Gig.find()
    .sort(sort)
    .limit(limit);

module.exports = {
  createGig,
  getAll,
};
