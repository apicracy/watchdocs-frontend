export const FETCH_ENDPOINTS = 'fetch@endpoints';
export const CLEAR_ENDPOINTS = 'clear@endpoints';

export function fetchEndpoints(tree, treeRootId) {
  return {
    type: FETCH_ENDPOINTS,
    payload: { tree, treeRootId },
  };
}

export function clearEndpoints() {
  return {
    type: CLEAR_ENDPOINTS,
  };
}
