const Gig = require('./gig.model').Gig;

const createGig = async gigParams => {
  const gig = new Gig(gigParams);
  const gigResult = await gig.save();
  return gigResult;
};

const getAll = async (limit = 0, sort = '', bbox = []) => {
  let selector = {};
  if (bbox.length) {
    selector = {
      location: {
        $geoWithin: {
          $geometry: {
            type: 'Polygon',
            coordinates: [bbox],
          },
        },
      },
    };
  }
  return await Gig.find(selector)
    .sort(sort)
    .limit(limit);
};

module.exports = {
  createGig,
  getAll,
};
