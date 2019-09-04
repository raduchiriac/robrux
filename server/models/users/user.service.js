const User = require('./user.model').User;
const jwt = require('jsonwebtoken');

const createUser = async userParams => {
  // check if passwords match
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
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        console.log('🚨[loginUser] I am setting a cookie with token:', token);
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day cookie
        });

        resolve({ token });
      }
    });
  });
};

module.exports = {
  createUser,
  loginUser,
};
