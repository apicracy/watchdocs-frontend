import { FETCH_DOCUMENTATION } from 'actions/documentation';

export const INITIAL_STATE = [];

export function documentation(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_DOCUMENTATION: return fetchDocumentation(payload);
    default: return state;
  }
}

function fetchDocumentation(payload) {
  return [...payload];
}
