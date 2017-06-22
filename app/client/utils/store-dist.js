
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { reducers } from 'reducers';
import { routerReducer } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
  form: formReducer,
  toastr: toastrReducer,
});

let store;

export function makeStore(initialState = {}, middlewares = [reduxThunk]) {
  const finalCreateStore = applyMiddleware(...middlewares)(createStore);
  store = finalCreateStore(reducer, initialState);
  return store;
}

export function dispatch(action) {
  store.dispatch(action);
}
