const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');

const CHUNK_FILENAME = '[name].js';

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

      'angular-mocks',
      'chai',
      'sinon'
    ],
    specs: './client/src/specs.js'
  },

  output: {
    path: path.resolve('./client/build-test'),
    filename: CHUNK_FILENAME,
    chunkFilename: CHUNK_FILENAME
  },

  plugins: [
    new webpack.ProvidePlugin({
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      fileName: CHUNK_FILENAME
    }),
    new webpack.NoErrorsPlugin(),
    new ProgressBarPlugin({
      format: 'Webpack :msg [:bar] :percent'
    })
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: combineLoaders([{
        loader: 'ng-annotate'
      }, {
        loader: 'babel',
        query: {
          extends: path.join(__dirname, '.babelrc.karma')
        }
      }])
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /sinon\.js$/,
      loader: 'imports?define=>false,require=>false'
    }, {
      test: /\.scss$/,
      loader: 'null'
    }, {
      test: /\.jpg$/,
      loader: 'null'
    }]
  },

  resolve: {
    alias: { sinon: 'sinon/pkg/sinon.js' }
  },

  devtool: 'inline-source-map'
};
