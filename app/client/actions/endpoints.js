export const FETCH_ENDPOINTS = 'fetch@endpoints';
export const REMOVE_ENDPOINT = 'remove@endpoints';

export function fetchEndpoints(endpoints) {
  return {
    type: FETCH_ENDPOINTS,
    payload: endpoints,
  };
}

export function removeEndpoint(endpointId) {
  return {
    type: REMOVE_ENDPOINT,
    payload: endpointId,
  };
}
