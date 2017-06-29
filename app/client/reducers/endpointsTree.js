import {
  FETCH_ENDPOINTS_START,
  FETCH_ENDPOINTS_SUCCESS,
  FETCH_ENDPOINTS_ERROR,
  CLEAR_ENDPOINTS,
} from 'actions/endpointsTree';

export const INITIAL_STATE = {
  isFetching: false,
  isFetched: false,
  list: [],
};

export function endpoints(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ENDPOINTS_START: return fetchEndpointsStart(state);
    case FETCH_ENDPOINTS_ERROR: return fetchEndpointsError(state);
    case FETCH_ENDPOINTS_SUCCESS: return fetchEndpointsSuccess(state, payload);
    case CLEAR_ENDPOINTS: return INITIAL_STATE;
    default: return state;
  }
}

function fetchEndpointsStart(state) {
  return {
    ...state,
    isFetching: true,
    isFetched: false,
    list: [],
  };
}

function fetchEndpointsError(state) {
  return {
    ...state,
    isFetching: false,
    isFetched: false,
  };
}

function fetchEndpointsSuccess(state, payload) {
  return {
    ...state,
    isFetching: false,
    isFetched: true,
    list: [...payload],
  };
}
