const UserType = require('./user.model').UserType;
const UserService = require('./user.service');
const { GraphQLString } = require('graphql');
const { AuthenticationError } = require('apollo-server-express');

const userQueries = {
  userInfo: {
    type: UserType,
    args: {
      id: { type: GraphQLString },
    },
    resolve: async (root, args, context, info) => {
      const { id } = args;
      return await UserService.userInfo(id);
    },
  },
};

module.exports = userQueries;
