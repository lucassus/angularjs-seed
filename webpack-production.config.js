const webpack = require('webpack');
const _ = require('lodash');

const config = require('./webpack.config.js');

const plugins = config.plugins.concat(
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
);

module.exports = _.extend({}, config, {
  plugins,
  devtool: 'source-map'
});
