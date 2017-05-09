import {
  FETCH_ENDPOINTS,
} from 'actions/endpoints';

export const INITIAL_STATE = [];

export function endpoints(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ENDPOINTS: return fetchEndpoints(payload);
    default: return state;
  }
}

function fetchEndpoints(payload) {
  return [...payload];
}
