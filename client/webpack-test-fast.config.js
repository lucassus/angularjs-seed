const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');

process.env.BABEL_ENV = 'test';

module.exports = {
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
      'angular-ui-router',
      'angular-breadcrumb',

      'angular-mocks',
      'power-assert',
      'sinon'
    ],
    specs: './client/src/specs.js'
  },

  output: {
    path: path.resolve('./client/build-test'),
    filename: '[name].js'
  },

  plugins: [
    new webpack.ProvidePlugin({
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin({
      format: 'Webpack :msg [:bar] :percent'
    })
  ],

  module: {
    exprContextCritical: false,

    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.(scss|jpg|svg)$/,
      loader: 'null-loader'
    }, {
      test: /sinon\.js$/,
      loader: 'imports-loader?define=>false,require=>false'
    }]
  },

  resolve: {
    alias: { sinon: 'sinon/pkg/sinon.js' }
  },

  devtool: 'inline-source-map'
};
