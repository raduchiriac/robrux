// File used for GraphQL mutations (DB Updates)
const { GraphQLNonNull, GraphQLInputObjectType } = require('graphql');
const NewsType = require('./news.model').NewsType;
const fields = require('./news.model').fields;
const NewsService = require('./news.service');

const NewsInputType = new GraphQLInputObjectType({
  name: 'NewsInputType',
  description: 'News payload definition',
  fields,
});

const newsMutations = {
  createNews: {
    type: NewsType,
    description: 'Add a news',
    args: {
      input: {
        type: new GraphQLNonNull(NewsInputType),
      },
    },
    resolve: async (rootValue, { input }, context) => {
      return await NewsService.createNews(input);
    },
  },
};

module.exports = newsMutations;
