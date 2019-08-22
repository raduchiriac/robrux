if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  env: {
    GOOGLE_MAPS_API: process.env.GOOGLE_MAPS_API,
    GRAPHQL_ROUTE: process.env.GRAPHQL_ROUTE,
  },
});
