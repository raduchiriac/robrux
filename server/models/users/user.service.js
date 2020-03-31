const User = require('./user.model').User;

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

const loginUser = async userParams => {
  return new Promise((resolve, reject) => {
    User.authenticate()(userParams.email, userParams.password, (fn, user, err) => {
      if (err) {
        reject(err);
      } else if (user) {
        resolve(user);
      }
    });
  });
};

const userInfo = async id => {
  let selector = { _id: id };
  return await User.findOne(selector).lean();
};

const updateUser = async (filter, update) => {
  return await User.updateOne(filter, update);
};

module.exports = {
  createUser,
  loginUser,
  userInfo,
  updateUser,
};
