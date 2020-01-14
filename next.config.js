if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  reactStrictMode: false,
  poweredByHeader: false,
  webpack: config => {
    config.plugins = config.plugins || [];

    config.resolve.alias['~'] = path.resolve(__dirname);

    config.plugins = [
      ...config.plugins,

      new webpack.EnvironmentPlugin({
        HOSTNAME: JSON.stringify(process.env.HOSTNAME || ''),
        PORT: JSON.stringify(process.env.PORT || ''),
        GRAPHQL_ROUTE: JSON.stringify(process.env.GRAPHQL_ROUTE || ''),
        GOOGLE_MAPS_API: JSON.stringify(process.env.GOOGLE_MAPS_API || ''),
        MAPBOX_API: JSON.stringify(process.env.MAPBOX_API || ''),
      }),
    ];

    return config;
  },
});
