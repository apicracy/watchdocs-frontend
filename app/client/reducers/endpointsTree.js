import {
  FETCH_ENDPOINTS,
  CLEAR_ENDPOINTS,
} from 'actions/endpointsTree';

export const INITIAL_STATE = {
  tree: [],
  treeRootId: null,
};

export function endpoints(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ENDPOINTS: return fetchEndpoints(state, payload);
    case CLEAR_ENDPOINTS: return INITIAL_STATE;
    default: return state;
  }
}

function fetchEndpoints(_state, payload) {
  return { ...payload };
}
