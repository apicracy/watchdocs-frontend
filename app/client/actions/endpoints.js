export const LOAD_ENDPOINTS = 'load@endpoints';

export function loadEndpoints(endpoints) {
  return {
    type: LOAD_ENDPOINTS,
    payload: endpoints,
  };
}
