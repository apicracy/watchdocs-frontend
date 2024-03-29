export const CLEAR_ENDPOINTS = 'clear@endpoints';
export const FETCH_ENDPOINTS_START = 'fetchStart@endpoints';
export const FETCH_ENDPOINTS_ERROR = 'fetchError@endpoints';
export const FETCH_ENDPOINTS_SUCCESS = 'fetchSuccess@endpoints';

export function fetchEndpointsStart() {
  return {
    type: FETCH_ENDPOINTS_START,
  };
}

export function fetchEndpointsError() {
  return {
    type: FETCH_ENDPOINTS_ERROR,
  };
}

export function fetchEndpointsSuccess(tree, treeRootId) {
  return {
    type: FETCH_ENDPOINTS_SUCCESS,
    payload: { tree, treeRootId },
  };
}

export function clearEndpoints() {
  return {
    type: CLEAR_ENDPOINTS,
  };
}
