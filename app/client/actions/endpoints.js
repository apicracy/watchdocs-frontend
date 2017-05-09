export const FETCH_ENDPOINTS = 'fetch@endpoints';

export function fetchEndpoints(endpoints) {
  return {
    type: FETCH_ENDPOINTS,
    payload: endpoints,
  };
}
