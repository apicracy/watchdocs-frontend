import {
  FETCH_ENDPOINTS,
} from 'actions/endpointsTree';

export const INITIAL_STATE = [];

export function endpoints(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ENDPOINTS: return fetchEndpoints(state, payload);
    default: return state;
  }
}

function fetchEndpoints(_state, payload) {
  return [...payload];
}
