import { LOAD_ENDPOINTS } from 'actions/endpoints';

export const INITIAL_STATE = [];

export function endpoints(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ENDPOINTS: return loadEndpoints(payload);
    default: return state;
  }
}

function loadEndpoints(payload) {
  return [...payload];
}
