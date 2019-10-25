if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const Dotenv = require('dotenv-webpack');

module.exports = withCSS(
  withSass({
    webpack: config => {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,

        new Dotenv({
          path: path.join(__dirname, './.env'),
        }),
      ];

      return config;
    },
  })
);
