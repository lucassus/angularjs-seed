const combineLoaders = require('webpack-combine-loaders');
const path = require('path');
const webpack = require('webpack');

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
    specs: './src/specs.js'
  },

  output: {
    path: path.resolve('./tmp'),
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
    new webpack.NoErrorsPlugin()
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
          extends: path.join(__dirname, '..', '.babelrc')
        }
      }])
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /sinon\.js$/,
      loader: 'imports?define=>false,require=>false'
    }, {
      test: /\.scss/,
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
