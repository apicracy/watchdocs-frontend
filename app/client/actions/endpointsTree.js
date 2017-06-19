export const FETCH_ENDPOINTS = 'fetch@endpoints';
export const CLEAR_ENDPOINTS = 'clear@endpoints';

export function fetchEndpoints(endpoints) {
  return {
    type: FETCH_ENDPOINTS,
    payload: endpoints,
  };
}

export function clearEndpoints() {
  return {
    type: CLEAR_ENDPOINTS,
  };
}
