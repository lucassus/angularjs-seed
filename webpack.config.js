const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      'babel-polyfill',
      'bootstrap-sass',
      'jquery',
      'lodash'
    ],
    app: './src/app.js'
  },

  output: {
    path: path.resolve('./build/assets'),
    filename: 'app.js',
    publicPath: 'assets/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: '../index.html',
      inject: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
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
      loaders: ['style', 'css', 'sass']
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
    contentBase: './build',
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
