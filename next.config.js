if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(
  withSass({
    webpack: config => {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,

        new webpack.EnvironmentPlugin({
          GRAPHQL_ROUTE: JSON.stringify(process.env.GRAPHQL_ROUTE || ''),
          GOOGLE_MAPS_API: JSON.stringify(process.env.GOOGLE_MAPS_API || ''),
        }),
      ];

      return config;
    },
  })
);
