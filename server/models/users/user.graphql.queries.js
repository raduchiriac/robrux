const UserType = require('./user.model').UserType;
const { AuthenticationError } = require('apollo-server-express');

const userQueries = {
  loggedInUser: {
    type: UserType,
    resolve: (root, args, context, info) => {
      // if (isEmpty(req.user)) throw new AuthenticationError("Must authenticate");
      // const user = await users.get({ userId: req.user.id });
      // return user;
      console.log('root', root);
      console.log('----------');
      console.log('args', args);
      console.log('----------');
      console.log('context', context);
      console.log('----------');
      console.log('info', info);
    },
  },
};

module.exports = userQueries;
