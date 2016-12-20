const combineLoaders = require('webpack-combine-loaders');
const path = require('path');
const webpack = require('webpack');

process.env.BABEL_ENV = 'test';

module.exports = function({ singleRun }) {
  const preLoaders = [];

  // Execute ESLint in tdd mode
  if (!singleRun) {
    preLoaders.push({
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    });
  }

  return {
    plugins: [
      new webpack.ProvidePlugin({
        'window.$': 'jquery',
        'window.jQuery': 'jquery'
      })
    ],

    module: {
      preLoaders,

      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: combineLoaders([{
          loader: 'ng-annotate'
        }, {
          loader: 'babel'
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
        test: /\.(scss|jpg|svg)$/,
        loader: 'null'
      }]
    },

    resolve: {
      alias: { sinon: 'sinon/pkg/sinon.js' }
    },

    devtool: 'inline-source-map'
  };
};
