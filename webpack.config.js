const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');
const path = require('path');
const webpack = require('webpack');

const BUILD_DIRECTORY = 'build';

// TODO bring back commons chunks (production)?
// TODO no errors plugin?
module.exports = {
  entry: './src/app.js',

  output: {
    path: path.resolve(BUILD_DIRECTORY),
    filename: 'app.js'
  },

  plugins: [
    new CleanWebpackPlugin(BUILD_DIRECTORY, {
      verbose: true
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
    new webpack.HotModuleReplacementPlugin()
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

  devServer: {
    port: 8080,
    contentBase: './build',

    // Serve index.html in place of 404 responses (html5 routing mode)
    historyApiFallback: true,

    hot: true,
    inline: true,

    proxy: {
      '/api': {
        target: 'http://localhost:9090'
      }
    },

    stats: {
      chunks: false,
      colors: true
    }
  },

  devtool: 'eval-source-map'
};
