const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

process.env.BABEL_ENV = 'test';

module.exports = {
  entry: {
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
      name: 'vendor',
      minChunks(module) {
        // Assumes that vendor imports exist in the `/node_modules/` directory
        return module.context && module.context.indexOf('/node_modules/') !== -1;
      }
    }),
    // CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
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
