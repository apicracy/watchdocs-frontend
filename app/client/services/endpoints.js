import { fetchEndpoints as load } from 'actions/endpoints';
import http from 'services/http';

export function fetchEndpoints(projectId) {
  return dispatch => (
    http(`/api/v1/projects/${projectId}`)
      .then(response => response.json())
      .then(data => dispatch(load(data.tree)))
  );
}
