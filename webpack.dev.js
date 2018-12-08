const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = env => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: ['babel-polyfill', './src/App.js'],
    mode: process.env.NODE_ENV,
    output: {
      filename: 'App-bundle.js',
      path: path.join(__dirname, 'public', 'dist')
    },
    module: {
      rules: [
        // {
        //   loader: 'babel-loader',
        //   test: /\.js$/,
        //   exclude: /node_modules/
        // },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].html'
              }
            },
            {
              loader: 'extract-loader'
            },
            {
              loader: 'html-loader',
              options: {
                attrs: ['img:src']
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|bmp|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        }
      ]
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    // plugins: [CSSExtract],
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
      overlay: true
    }
  };
};
