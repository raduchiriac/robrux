const Gig = require('./gig.model').Gig;

const createGig = async gigParams => {
  const gig = new Gig(gigParams);
  const gigResult = await gig.save();
  return gigResult;
};

const getBboxGigs = async (limit = 0, sort = '', bbox = [], search = '', category) => {
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
  if (!!search.length) {
    selector['$text'] = { $search: search };
  }
  if (category >= 0) {
    selector.categories = { $in: [category] };
  }
  return await Gig.find(selector).sort(sort).limit(limit).populate('_userId').lean();
};

const oneGig = async idOrSlug => {
  let query = { status: 'valid', $or: [{ slug: idOrSlug }] };
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    query.$or.push({ _id: idOrSlug });
  }
  return await Gig.findOne(query).populate('_ratings').populate('_userId').lean();
};

const fuzzySearch = async (string, limit) => {
  return await Gig.find(
    {
      status: 'valid',
      $text: { $search: string },
    },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit)
    .populate('_userId')
    .lean();
};

const updateGig = async (filter, update) => {
  return await Gig.updateOne(filter, update);
};

module.exports = {
  createGig,
  oneGig,
  updateGig,
  getBboxGigs,
  fuzzySearch,
};
