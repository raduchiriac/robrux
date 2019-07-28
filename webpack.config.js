const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const dev_server_port = 4000;
const dev_client_port = 8080;

module.exports = {
  mode: 'development',
  entry: ['./client/index.js'],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    filename: 'bundle.js',
    port: dev_client_port,
  },
  externals: {
    config: JSON.stringify({
      WEBPACK_SERVER_URL: `http://localhost:${dev_server_port}`,
    }),
  },
};
