import http from 'services/http';

import {
  setEndpointView,
  addEndpointParam as addEndpointParamAction,
} from 'actions/endpointView';

export function loadEndpoint(id) {
  return (dispatch) => {
    http(`/api/v1/endpoints/${id}`)
      .then(response => response.json())
      .then((data) => {
        dispatch(setEndpointView(data));
      });
  };
}

export function addEndpointParam(endpointParam) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(endpointParam),
    };

    http('/api/v1/url_params/', options)
      .then(response => response.json())
      .then((data) => {
        if (!data.errors) {
          dispatch(addEndpointParamAction(data));
        }
      });
  };
}
