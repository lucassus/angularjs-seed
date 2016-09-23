const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');
const _ = require('lodash');

const config = require('./webpack.config.js');

const plugins = config.plugins.concat(
  new FaviconsWebpackPlugin({
    logo: './src/images/logo.png'
  }),
  new ProgressBarPlugin({
    format: ':msg [:bar] :percent'
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: true,
    comments: false
  }),
  new webpack.optimize.OccurenceOrderPlugin(true)
);

module.exports = _.extend({}, config, {
  plugins,
  devtool: 'source-map'
});
