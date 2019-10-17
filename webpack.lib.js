const merge = require('webpack-merge');

const prodConfig = require('./webpack.prod.js');

module.exports = merge(prodConfig, {
  output: {
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      commonjs2: 'react',
      commonjs: 'react'
    },
    'react-dom': {
      commonjs2: 'react-dom',
      commonjs: 'react-dom'
    }
  }
});
