const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  entry: ['./src/index.js', './src/sass/global.scss'],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'build',
  },

  devtool: 'inline-source-map',

  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: 'public',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.html$/,
        use: [
          // apply multiple loaders and options
          "htmllint-loader",
          {
            loader: "html-loader"
          }
        ]
      },
    ],
  },
  plugins: [
    new BrowserSyncPlugin(
      {
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: '0.0.0.0',
        port: 3000,
        server: { baseDir: ['public'],
        files: [{
          match: [
              '**/*.hbs'
          ],
          fn: function(event, file) {
              if (event === "change") {
                  const bs = require('browser-sync').get('bs-webpack-plugin');
                  bs.reload();
              }
          }
        }]}
      },
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    ),
    new ExtractTextPlugin('css/global.css')
  ],
};

module.exports = config;
