/**
 * endpointView Actions
 */

export const FETCH_DOCUMENTATION_REQUEST = 'fetchRequest@documentation';
export const FETCH_DOCUMENTATION_SUCCESS = 'fetch@documentation';

export function fetchDocumentation(documentation) {
  return {
    type: FETCH_DOCUMENTATION_SUCCESS,
    payload: documentation,
  };
}

export function fetchRequest() {
  return {
    type: FETCH_DOCUMENTATION_REQUEST,
  };
}
