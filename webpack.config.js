const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      'angular',
      'angular-messages',
      'angular-resource',
      'angular-ui-router',
      'lodash'
    ],
    app: './src/app.js'
  },

  output: {
    path: path.resolve('./public/assets'),
    filename: 'app.js',
    publicPath: 'assets/'
  },

  plugins: [
    new CleanWebpackPlugin('public/assets', {
      verbose: true,
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: combineLoaders([{
        loader: 'ng-annotate'
      }, {
        loader: 'babel-loader',
        query: {
          extends: path.join(__dirname, '.babelrc')
        }
      }])
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass', {
        publicPath: '../assets/'
      }),
    }, {
      test: /\.png$/,
      loader: 'url-loader?limit=100000'
    }, {
      test: /\.jpg$/,
      loader: 'file-loader'
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

  devServer: {
    port: 8080,
    contentBase: './public',

    inline: true,

    proxy: {
      '/api': {
        target: 'http://localhost:9090',
      }
    },

    stats: {
      chunks: false,
      colors: true
    }
  },

  devtool: 'source-map'
};
