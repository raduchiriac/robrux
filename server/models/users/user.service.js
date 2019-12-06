const User = require('./user.model').User;
const { createCookieTokens } = require('../../_helpers/auth/setTokens');

const createUser = async userParams => {
  if (userParams.password !== userParams.confirmPassword) {
    throw new Error('Your passwords do not match');
  }
  const user = await new User(userParams);

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

const loginUser = async (userParams, res) => {
  return new Promise((resolve, reject) => {
    User.authenticate()(userParams.email, userParams.password, (fn, user, err) => {
      if (err) {
        reject(err);
      } else if (user) {
        const cookies = createCookieTokens(user);
        res.cookie(...cookies.access);
        res.cookie(...cookies.refresh);
        resolve(user);
      }
    });
  });
};

module.exports = {
  createUser,
  loginUser,
};
