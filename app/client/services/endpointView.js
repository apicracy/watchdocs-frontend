import http from 'services/http';

import {
  setEndpointView,
  addEndpointParam as addEndpointParamAction,
  removeEndpointParam as removeEndpointParamAction,
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

export function removeUrlParams(id) {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
    };

    http(`/api/v1/url_params/${id}`, options)
      .then(response => response.json())
      .then((data) => {
        if (!data.errors) {
          dispatch(removeEndpointParamAction(id));
        }
      });
  };
}
