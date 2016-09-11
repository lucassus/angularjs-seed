// eslint-disable-next-line no-undef
module.exports = {
  entry: './src/app.js',

  output: {
    path: './build',
    filename: 'app.bundle.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },

  devtool: 'source-map'
};
