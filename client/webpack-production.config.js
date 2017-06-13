const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const BUILD_DIRECTORY = './client/build';

const extractCSS = new ExtractTextPlugin('style.[contenthash].css');

module.exports = {
  entry: {
    app: './client/src/app.js'
  },

  output: {
    path: path.resolve(BUILD_DIRECTORY),
    filename: '[name].[chunkhash].js'
  },

  plugins: [
    new CleanWebpackPlugin(BUILD_DIRECTORY, {
      verbose: true,
      root: process.cwd()
    }),
    new FaviconsWebpackPlugin({
      logo: './client/src/images/logo.png'
    }),
    new ProgressBarPlugin({
      format: 'Webpack :msg [:bar] :percent'
    }),
    new webpack.ProvidePlugin({
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'client/src/index.html',
      inject: true
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
    extractCSS,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: true,
      comments: false,
      sourceMap: true
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.scss$/,
      use: extractCSS.extract([
        'css-loader?minimize',
        'sass-loader'
      ])
    }, {
      test: /\.png$/,
      loader: 'url-loader?limit=100000'
    }, {
      test: /\.jpg$/,
      loader: 'file-loader'
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }]
  },

  devtool: 'source-map'
};
