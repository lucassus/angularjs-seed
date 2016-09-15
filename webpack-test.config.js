module.exports = {
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    alias: { sinon: 'sinon/pkg/sinon.js' }
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ng-annotate!ts-loader'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /sinon\.js$/,
      loader: 'imports?define=>false,require=>false'
    }, {
      test: /\.scss/,
      loader: 'null-loader'
    }, {
      test: /\.jpg$/,
      loader: 'null-loader'
    }]
  },

  devtool: 'inline-source-map'
};
