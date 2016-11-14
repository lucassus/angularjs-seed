const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');
const path = require('path');
const webpack = require('webpack');

const BUILD_DIRECTORY = 'build';
const CHUNK_FILENAME = '[name].[hash].js';

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
      'angular-ui-router'
    ],
    app: ['./src/app.js']
  },

  output: {
    path: path.resolve(BUILD_DIRECTORY),
    filename: CHUNK_FILENAME,
    chunkFilename: CHUNK_FILENAME
  },

  plugins: [
    new CleanWebpackPlugin(BUILD_DIRECTORY, {
      verbose: true,
      root: process.cwd()
    }),
    new FaviconsWebpackPlugin({
      logo: './src/images/logo.png'
    }),
    new ProgressBarPlugin({
      format: ':msg [:bar] :percent'
    }),
    new webpack.ProvidePlugin({
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      fileName: CHUNK_FILENAME
    }),
    new ExtractTextPlugin('style.[hash].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: true,
      comments: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.AggressiveMergingPlugin()
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
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass')
    }, {
      test: /\.png$/,
      loader: 'url?limit=100000'
    }, {
      test: /\.jpg$/,
      loader: 'file'
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }]
  },

  devtool: 'source-map'
};
