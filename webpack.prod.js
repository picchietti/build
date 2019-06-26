const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(png)$/,
          options: {
            lossless: true
          }
        }, {
          test: /\.(jpe?g)$/,
          options: {
            quality: 65
          }
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            extends: './.babelrc',
            compact: true,
            minified: true
          }
        }
      }
    ]
  }
});
