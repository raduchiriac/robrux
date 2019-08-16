const User = require('./user.model').User;
const jwt = require('jsonwebtoken');

const createUser = async userParams => {
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

const loginUser = async userParams => {
  return new Promise((resolve, reject) => {
    User.authenticate()(userParams.email, userParams.password, (fn, user, err) => {
      if (err) {
        reject(err);
      } else if (user) {
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        resolve({ token });
      }
    });
  });
};

module.exports = {
  createUser,
  loginUser,
};
