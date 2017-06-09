import {
  fetchEndpoints as load,
  removeEndpoint as remove,
} from 'actions/endpointsTree';

import http from 'services/http';

export function fetchEndpoints(projectId) {
  return dispatch => (
    http(`/api/v1/projects/${projectId}`)
      .then(response => response.json())
      .then(data => dispatch(load(data.tree)))
  );
}

export function removeEndpoint(endpointId) {
  return dispatch => (
    dispatch(remove(endpointId))
  );
}

export function flattenTree(tree) {
  return tree.reduce(flat, []);
}

function flat(list, item) {
  const newItem = {};
  Object.keys(item).forEach((key) => {
    if (key !== 'items') {
      newItem[key] = item[key];
    }
  });

  list.push(newItem);

  if (Array.isArray(item.items)) {
    return item.items.reduce(flat, list);
  }
  return list;
}