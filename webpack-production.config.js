const webpack = require('webpack');

const devConfig = require('./webpack.config.js');
const config = Object.create(devConfig);

config.plugins = config.plugins.concat(
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
);

module.exports = config;
