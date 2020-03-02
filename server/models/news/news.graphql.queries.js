const { GraphQLList, GraphQLInt, GraphQLString } = require('graphql');
const NewsService = require('./news.service');
const NewsType = require('./news.model').NewsType;

const newsQueries = {
  news: {
    type: GraphQLList(NewsType),
    args: {
      limit: { type: GraphQLInt },
      sort: { type: GraphQLString },
    },
    resolve: async (root, args, context, info) => {
      // Limit of returned results, sort by a field ('rating' or '-rating'), coordinates bounding box
      const { limit = 10, sort = '-createdAt' } = args;
      return await NewsService.getAllNews(limit, sort);
    },
  },
  oneNews: {
    type: NewsType,
    args: {
      idOrSlug: { type: GraphQLString },
    },
    resolve: async (root, args, context, info) => {
      const { idOrSlug } = args;
      return await NewsService.oneNews(idOrSlug);
    },
  },
};

module.exports = newsQueries;
