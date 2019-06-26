const merge = require('webpack-merge');

const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            extends: `@picchietti/build/.babelrc`,
            compact: false
          }
        }
      }
    ]
  }
});
