import {
  FETCH_ENDPOINTS,
  REMOVE_ENDPOINT,
} from 'actions/endpoints';

export const INITIAL_STATE = [];

export function endpoints(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ENDPOINTS: return fetchEndpoints(payload);
    case REMOVE_ENDPOINT: return removeEndpoint(state, payload);
    default: return state;
  }
}

function fetchEndpoints(payload) {
  return [...payload];
}

function removeEndpoint(state, payload) {
  const currentEndpoints = state.filter(e => e.id !== payload);
  return [...currentEndpoints];
}
