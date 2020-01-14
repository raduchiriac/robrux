// // File used for GraphQL mutations (DB Updates)
const { GraphQLNonNull, GraphQLInputObjectType } = require('graphql');
const UserType = require('./user.model').UserType;
const UserAuthType = require('./user.model').UserAuthType;
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
  updateUserWithGigs: { type: UserType },
  register: {
    type: UserType,
    description: 'Create a new user',
    args: {
      input: {
        type: new GraphQLNonNull(UserInputTypeRegister),
      },
    },
    resolve: async (rootValue, { input }, context) => {
      return await UserService.createUser(input);
    },
  },
  login: {
    type: UserAuthType,
    description: 'Login user',
    args: {
      input: {
        type: new GraphQLNonNull(UserInputTypeLogin),
      },
    },
    resolve: async (rootValue, { input }, context) => {
      return await UserService.loginUser(input, context.res);
    },
  },
};

module.exports = userMutations;
