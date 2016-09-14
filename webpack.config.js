const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    vendor: [
      'angular',
      'bootstrap-sass',
      'jquery'
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
      loader: 'babel-loader'
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
