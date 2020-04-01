const News = require('./news.model').News;

const createNews = async params => {
  const news = new News(params);
  const newsResult = await news.save();
  return newsResult;
};

const oneNews = async idOrSlug => {
  let selector = { status: 'live', $or: [{ slug: idOrSlug }] };
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    selector.$or.push({ _id: idOrSlug });
  }
  return await News.findOne(selector).lean();
};

const getAllNews = async (limit, sort) => {
  const selector = { status: 'live' };
  return await News.find(selector).sort(sort).limit(limit).lean();
};

module.exports = {
  createNews,
  oneNews,
  getAllNews,
};
