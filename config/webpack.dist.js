/* eslint no-process-env:0 */

const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const appEnv = require('../app/env');
const reappDevTools = require('reapp-dev-tools');

appEnv['process.env.NODE_ENV'] = '"production"';

config.entry = [
  './app/client/app.prod',
];

config.output.filename = 'app.min.js';
config.output.path = path.join(process.cwd(), 'dist');

config.externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

config.plugins = [
  new webpack.DefinePlugin(Object.assign({}, reappDevTools.json2env(appEnv), {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  })),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new webpack.ProvidePlugin({
    fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
  }),
];

// remove the alias to development utilities
config.resolve.alias = {
  'utils/main': 'utils/main-dist',
  'utils/store': 'utils/store-dist',
  fetch: path.join('/node_modules', 'whatwg-fetch', 'fetch.js'),
};

// remove development tools
config.devtool = null;
config.module.loaders[0].loaders = ['babel'];

module.exports = config;
