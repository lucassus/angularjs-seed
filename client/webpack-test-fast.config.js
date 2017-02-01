const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');

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
      'chai',
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
    new webpack.NoErrorsPlugin(),
    new ProgressBarPlugin({
      format: 'Webpack :msg [:bar] :percent'
    })
  ],

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: combineLoaders([{
        loader: 'ng-annotate-loader'
      }, {
        loader: 'babel-loader'
      }])
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
