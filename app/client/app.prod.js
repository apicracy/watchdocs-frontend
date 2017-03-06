/**
 * ReactClient
 * app startup script for production purpose
 */

/* eslint no-process-env:0 */
require('./index.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import { Main } from 'utils/main';
import { makeStore } from 'utils/store';

import initialState from 'fixtures/initial-state-prod.fixture';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

let history;

export function start(targetEl, payload) {
  // apply the host's page payload
  if (payload.title) {
    initialState.app = {
      title: payload.title,
    };
  }

  // create the application Redux store
  const appStore = makeStore(initialState);
  history = syncHistoryWithStore(browserHistory, appStore);

  ReactDOM.render((
    <Main
      store={appStore}
      history={history}
    />
  ), targetEl);
}
