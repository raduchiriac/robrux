// // File used for GraphQL mutations (DB Updates)
const { GraphQLNonNull, GraphQLInputObjectType } = require('graphql');
const UserType = require('./user.model').UserType;
const UserAuthType = require('./user.model').UserAuthType;
const UserService = require('./user.service');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

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
      const user = await UserService.loginUser(input);
      const token = jwt.sign({ _id: user._id, time: new Date() }, process.env.JWT_SECRET, {
        expiresIn: '6h',
      });

      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', token, {
          httpOnly: true,
          maxAge: 6 * 60 * 60,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
      );

      return user;
    },
  },
};

module.exports = userMutations;
