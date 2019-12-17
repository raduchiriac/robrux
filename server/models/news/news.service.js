const News = require('./news.model').News;

const createNews = async params => {
  const news = new News(params);
  const newsResult = await news.save();
  return newsResult;
};

const getOneNews = async () => {
  // return await News.findOne(query);
};

const getAllNews = async () => {
  // return await News.find(selector)
  //   .sort(sort)
  //   .limit(limit);
};

module.exports = {
  createNews,
  getOneNews,
  getAllNews,
};
