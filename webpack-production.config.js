const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

const config = require('./webpack.config.js');

const CHUNK_FILENAME = '[name].[hash].js';

// TODO bring back `new ExtractTextPlugin('style.[chunkhash].css')`

const plugins = config.plugins.concat(
  new FaviconsWebpackPlugin({
    logo: './src/images/logo.png'
  }),
  new ProgressBarPlugin({
    format: ':msg [:bar] :percent'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    fileName: CHUNK_FILENAME
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
  entry: {
    vendor: [
      'jquery',
      'lodash',
      'angular',
      'angular-animate',
      'angular-messages',
      'angular-resource',
      'angular-loading-bar',
      'angular-toastr',
      'angular-ui-router'
    ],
    app: ['./src/app.js']
  },

  output: {
    path: path.resolve('build'),
    filename: CHUNK_FILENAME,
    chunkFilename: CHUNK_FILENAME
  },

  plugins,
  devtool: 'source-map'
});
