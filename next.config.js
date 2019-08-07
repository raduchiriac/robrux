require('dotenv').config();
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    GOOGLE_MAPS_API: process.env.GOOGLE_MAPS_API,
  },
});
