const Gig = require('./gig.model').Gig;

const createGig = async gigParams => {
  const gig = new Gig(gigParams);
  const gigResult = await gig.save();
  return gigResult;
};

const getBboxGigs = async (limit = 0, sort = '', bbox = []) => {
  let selector = {};
  if (bbox.length) {
    selector = {
      status: 'valid',
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

const oneGig = async idOrSlug => {
  return {
    _id: '5d5d9bd9df1ff244fc754ebf',
    location: {
      type: 'Point',
      coordinates: [50.841001, 4.355055],
      address: '3475 Eichmann Avenue, Isle of Man',
    },
    title: 'Ergonomic asymmetric functionalities',
  };
};

const fuzzySearch = async string => {
  return await Gig.find(
    {
      status: 'valid',
      $text: { $search: string },
    },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

module.exports = {
  createGig,
  oneGig,
  getBboxGigs,
  fuzzySearch,
};
