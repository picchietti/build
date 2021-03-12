const fs = require('fs');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const copyIfExists = [
  { from: './src/components/app/assets', to: './' },
  { from: './src/pages/resource/assets', to: './pages/resource/assets/' }
].filter((item) => fs.existsSync(item.from));

const plugins = [
  new CleanWebpackPlugin()
];

copyIfExists.length > 0 &&
  plugins.push(new CopyWebpackPlugin(copyIfExists));

if (fs.existsSync('./src/index.html')) {
  plugins.push(new HtmlWebpackPlugin({
    minify: {
      html5: true,
      useShortDoctype: true,
      collapseWhitespace: true,
      quoteCharacter: '"',
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      sortAttributes: true,
      collapseBooleanAttributes: true
    },
    showErrors: true,
    template: './src/index.html',
    filename: './index.html',
    inject: false
  }));
}

if (fs.existsSync('./src/components/app/assets/service-worker.js')) {
  plugins.push(new InjectManifest({
    swSrc: './src/components/app/assets/service-worker.js',
    importWorkboxFrom: 'disabled'
  }));
}

// plugins.push(new BundleAnalyzerPlugin());

module.exports = {
  plugins,
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    port: 8080,
    writeToDisk: true,
    historyApiFallback: true,
    serveIndex: false
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:5]',
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'node_modules/@picchietti/build/postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /font/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './images/',
              publicPath: '/images/'
            }
          }
        ]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /image/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './fonts/',
              publicPath: '/fonts/'
            }
          }
        ]
      },
      {
        type: 'javascript/auto',
        test: /\.(json|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './other/',
              publicPath: '/other/'
            }
          }
        ]
      },
      {
        test: /\.bundle\.js$/,
        use: {
          loader: 'bundle-loader',
          options: {
            lazy: true
          }
        }
      }
    ]
  }
};
