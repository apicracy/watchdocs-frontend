import { setEndpointView } from 'actions/endpointView';

import { filterById } from 'services/endpoint-service';

export function loadEndpoint(id) {
  return (dispatch, getState) => {
    const jwtToken = localStorage.getItem('JWT');
    const init = {
      headers: {
        authorization: jwtToken,
      },
    };
    const { endpoints } = getState();
    const endpoint = filterById([...endpoints], id);
    dispatch(setEndpointView(endpoint));

    fetch(`http://watchdocs-backend-dev.herokuapp.com/api/v1/endpoints/${id}`, init)
      .then(response => response.json())
      .then((data) => {
        dispatch(setEndpointView(data));
      });
  };
}
