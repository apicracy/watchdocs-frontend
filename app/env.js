/**
 * Environment Variables
 * this files contains development settings that are shared across the team
 *
 * if you need to create local settings that will not be pushed in github
 * create an `env.local.js` and exports your custom settings as it follows:
 */

/**
 * Production Settings
 */

let APP_ENV = {
  BASE_PATH: '/',
  'process.env.API_URL': process.env.API_URL,
};

/**
 * Development settings
 */

/* eslint no-process-env:0 */
if (process.env.NODE_ENV === 'development') {
  APP_ENV = Object.assign({}, APP_ENV, {
    BASE_PATH: '/dist/',
    'process.env.API_URL': 'https://watchdocs-backend-dev.herokuapp.com',
  });
}

/**
 * Personal settings override
 * (env.local.js is present)
 */

const fs = require('fs');
const path = require('path');

if (fs.existsSync(path.join(__dirname, 'env.local.js'))) {
  /* eslint global-require:0 */
  APP_ENV = require('./env.local');
}

/**
 * Export the computed environment variables
 */

module.exports = APP_ENV;
