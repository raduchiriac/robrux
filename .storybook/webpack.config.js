if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  config.resolve.alias['~'] = path.resolve(path.join(__dirname, '../'));

  // Return the altered config
  return config;
};
