
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { reducers } from 'reducers';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
  form: formReducer,
});

// Commented out for a moment as we decided to use regular dev tools
// import { DevTools } from './main-dev';

let store;

export function makeStore(initialState = {}, middlewares = [reduxThunk]) {
  /* eslint no-undef: 0*/
  // const persistParam = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const finalCreateStore = composeEnhancers(
    applyMiddleware(...middlewares),
    // DevTools.instrument(),
    /* eslint global-require: 0*/
    // require('redux-devtools').persistState(persistParam),
  )(createStore);

  store = finalCreateStore(reducer, initialState);

  return store;
}

export function dispatch(action) {
  store.dispatch(action);
}
