const User = require('./user.model').User;

const createUser = async userParams => {
  const user = new User(userParams);

  return new Promise((resolve, reject) => {
    return User.register(user, userParams.password, err => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

const loginUser = async userParams => {
  return new Promise((resolve, reject) => {
    return User.authenticate()(userParams.email, userParams.password, (err, user) => {
      if (user) {
        resolve(user);
      } else {
        reject('Incorrect Email / Password');
      }
    });
  });
};

module.exports = {
  createUser,
  loginUser,
};
