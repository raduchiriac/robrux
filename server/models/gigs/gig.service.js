const Gig = require('./gig.model').Gig;

const createGig = async gigParams => {
  const gig = new Gig(gigParams);
  const gigResult = await gig.save();
  return gigResult;
};

const getBboxGigs = async (limit = 0, sort = '', bbox = [], searchingFor = '') => {
  let selector = { status: 'valid' };
  if (bbox.length) {
    selector.location = {
      $geoWithin: {
        $geometry: {
          type: 'Polygon',
          coordinates: [bbox],
        },
      },
    };
  }
  if (!!searchingFor.length) {
    selector['$text'] = { $search: searchingFor };
  }
  return await Gig.find(selector)
    .sort(sort)
    .limit(limit);
};

const oneGig = async idOrSlug => {
  let query = { status: 'valid', $or: [{ slug: idOrSlug }] };
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    query.$or.push({ _id: idOrSlug });
  }
  return await Gig.findOne(query);
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
