const combineLoaders = require('webpack-combine-loaders');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  module: {
    // TODO only in tdd
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],

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
