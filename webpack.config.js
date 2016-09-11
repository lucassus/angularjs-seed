const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      'angular',
      'bootstrap-sass'
    ],
    app: './src/app.js'
  },

  output: {
    path: './build',
    filename: 'app.js',
    publicPath: 'build/'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
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

  devtool: 'source-map'
};
