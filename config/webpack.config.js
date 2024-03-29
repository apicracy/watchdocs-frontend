/* eslint no-process-env:0 */

const path = require('path');
const webpack = require('webpack');
const appEnv = require('../app/env');
const reappConf = require('./reapp.conf');
const reappDevTools = require('reapp-dev-tools');

module.exports = {
  devtool: 'sourcemaps',
  entry: {
    app: [
      `webpack-dev-server/client?http://${reappConf.host}:${reappConf.port}`,
      'webpack/hot/only-dev-server',
      path.join(process.cwd(), 'app/client/app.dev'),
    ],
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js',
    publicPath: '/',
    library: 'app',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(Object.assign({}, reappDevTools.json2env(appEnv), {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    })),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
  resolve: {
    extensions: ['', '.js', 'css'],
    modulesDirectories: [
      'node_modules',
      path.join(process.cwd(), 'app', 'client'),
      path.join(process.cwd(), 'app', 'tests'),
      path.join(process.cwd(), 'app', 'plugins'),
    ],
    alias: {
      'utils/main': 'utils/main-dev',
      'utils/store': 'utils/store-dev',
      fetch: path.join('/node_modules', 'whatwg-fetch', 'fetch.js'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader/webpack', 'babel'],
        exclude: /(node_modules|bower_components)/,
        include: process.cwd(),
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url!img?optimizationLevel=7',
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/vnd.ms-fontobject',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline',
        query: {
          removeTags: true,
          removingTags: ['title', 'desc'],
          classPrefix: true,
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)$/,
        loader: 'url?mimetype=image/svg+xml',
      },
    ],
  },
  babel: {
    optional: [
      'es7.classProperties',
      'es7.decorators',
    ],
  },
  sassLoader: {
    data: reappDevTools.json2query(appEnv),
  },
  devServer: {
    hot: true,
    historyApiFallback: {
      index: '/config/client.html',
    },
    stats: {
      colors: true,
    },
  },
};
