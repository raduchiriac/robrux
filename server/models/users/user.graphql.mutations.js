// // File used for GraphQL mutations (DB Updates)
const { GraphQLNonNull, GraphQLInputObjectType } = require('graphql');
const UserType = require('./user.model').UserType;
const UserService = require('./user.service');

const UserInputTypeRegister = new GraphQLInputObjectType({
  name: 'UserInputTypeRegister',
  description: 'User payload Register',
  fields: require('./user.model').fieldsInputRegister,
});

const UserInputTypeLogin = new GraphQLInputObjectType({
  name: 'UserInputTypeLogin',
  description: 'User payload Login',
  fields: require('./user.model').fieldsInputLogin,
});

const userMutations = {
  register: {
    type: UserType,
    description: 'Create a new user',
    args: {
      input: {
        type: new GraphQLNonNull(UserInputTypeRegister),
      },
    },
    resolve: async (rootValue, { input }) => {
      return await UserService.createUser(input);
    },
  },
  login: {
    type: UserType,
    description: 'Login user',
    args: {
      input: {
        type: new GraphQLNonNull(UserInputTypeLogin),
      },
    },
    resolve: async (rootValue, { input }) => {
      return await UserService.loginUser(input);
    },
  },
};

module.exports = userMutations;
