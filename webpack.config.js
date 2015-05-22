var webpack = require('webpack');


module.exports = {
  entry: './index.js',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel?stage=0&loose[]=es6.modules&loose[]=es6.classes'
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery'
    })
  ],
  output: {
    filename: 'bundle.js'
  }
};
