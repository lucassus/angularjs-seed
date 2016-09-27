const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    alias: { sinon: 'sinon/pkg/sinon.js' }
  },

  plugins: [
    new webpack.ProvidePlugin({
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ng-annotate!ts'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /sinon\.js$/,
      loader: 'imports?define=>false,require=>false'
    }, {
      test: /\.scss/,
      loader: 'null'
    }, {
      test: /\.jpg$/,
      loader: 'null'
    }]
  },

  devtool: 'inline-source-map'
};
