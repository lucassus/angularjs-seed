const webpack = require('webpack');

process.env.BABEL_ENV = 'test';

module.exports = function({ singleRun }) {

  const jsLoaders = ['babel-loader'];

  // Execute ESLint in tdd mode
  if (!singleRun) {
    jsLoaders.push('eslint-loader');
  }

  return {
    plugins: [
      new webpack.ProvidePlugin({
        'window.$': 'jquery',
        'window.jQuery': 'jquery'
      })
    ],

    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: jsLoaders
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
};
