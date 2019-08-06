const UserType = require('./user.model').UserType;

const userQueries = {
  profile: {
    type: UserType,
    resolve: (root, args, context, info) => {
      return new Promise((resolve, reject) => {
        // if (root.user) {
        //   return resolve(req.user);
        // }
        // return reject('Not Authenticated!');
      });
    },
  },
};

module.exports = userQueries;
