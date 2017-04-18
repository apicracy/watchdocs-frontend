import { fetchEndpoints as load } from 'actions/endpoints';

export function fetchEndpoints(projectId) {
  return (dispatch) => {
    const jwtToken = localStorage.getItem('JWT');
    const init = {
      headers: {
        authorization: jwtToken,
      },
    };

    fetch(`http://watchdocs-backend-dev.herokuapp.com/api/v1/projects/${projectId}`, init)
      .then(response => response.json())
      .then((data) => {
        dispatch(load(data.tree));
      });
  };
}
