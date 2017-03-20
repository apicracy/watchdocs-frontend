import { fetchEndpoints as load } from 'actions/endpoints';

export function fetchEndpoints(projectId) {
  return (dispatch) => {
    fetch(`/endpoints/${projectId}`)
      .then(response => response.json())
      .then((data) => {
        dispatch(load(data));
      });
  };
}
