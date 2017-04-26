import { FETCH_DOCUMENTATION_SUCCESS, FETCH_DOCUMENTATION_REQUEST } from 'actions/documentation';

export const INITIAL_STATE = {
  isFetching: false,
  data: [],
};

export function documentation(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_DOCUMENTATION_SUCCESS: return fetchDocumentation(payload);
    case FETCH_DOCUMENTATION_REQUEST: return isFetching(state);
    default: return state;
  }
}

function fetchDocumentation(payload) {
  return {
    isFetching: false,
    data: [...payload],
  };
}

function isFetching() {
  return {
    isFetching: true,
    data: [],
  };
}
