const combineLoaders = require('webpack-combine-loaders');
const path = require('path');

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: combineLoaders([{
        loader: 'ng-annotate'
      }, {
        loader: 'babel-loader',
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
      loader: 'null-loader'
    }, {
      test: /\.jpg$/,
      loader: 'null-loader'
    }]
  },

  resolve: {
    alias: { sinon: 'sinon/pkg/sinon.js' }
  },

  devtool: 'inline-source-map'
};
