/**
 * ReactClient
 * app startup script for development purpose
 */

/* eslint no-process-env:0 */
require('./index.scss');

import React from 'react';
import ReactDOM from 'react-dom';

// those files are aliased in `config/webpack.config.js`
// they actually import `{fileName}-dev.js`
import { Main } from 'utils/main';
import { makeStore } from 'utils/store';

import initialState from 'fixtures/initial-state-dev.fixture';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

let appStore;
let history;

export function start(targetEl) {
  // build the app' store and reference it to the module
  appStore = makeStore(initialState);
  history = syncHistoryWithStore(browserHistory, appStore);
  ReactDOM.render((
    <Main
      store={appStore}
      history={history}
    />
  ), targetEl);
}

export function dispatch(action) {
  appStore.dispatch(action);
}
