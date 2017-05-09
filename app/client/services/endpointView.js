import http from 'services/http';
import { browserHistory } from 'react-router';

import {
  setEndpointView,
  addEndpointParam as addEndpointParamAction,
  updateEndpointParam as updateEndpointParamAction,
  removeEndpointParam as removeEndpointParamAction,
  addResponse as addResponseAction,
  removeResponse as removeResponseAction,
} from 'actions/endpointView';

import { urlFormatProjectName } from 'services/projects';

import { removeEndpoint as removeEndpointAction } from 'actions/endpoints';

export function loadEndpoint(id) {
  return (dispatch) => {
    dispatch(setEndpointView({
      isFetching: true,
    }));

    http(`/api/v1/endpoints/${id}`)
      .then(response => response.json())
      .then((data) => {
        dispatch(setEndpointView({ ...data, isFetching: false }));
      });
  };
}

export function addEndpointParam(endpointParam) {
  return (dispatch) => {
    dispatch(setEndpointView({ isFetching: true }));

    const options = {
      method: 'POST',
      body: JSON.stringify(endpointParam),
    };

    http('/api/v1/url_params/', options)
      .then(response => response.json())
      .then((data) => {
        if (!data.errors) {
          dispatch(addEndpointParamAction(data));
          dispatch(setEndpointView({ isFetching: false }));
        }
      });
  };
}

export function updateEndpointParam(endpointParam) {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(endpointParam),
    };

    http(`/api/v1/url_params/${endpointParam.id}`, options)
      .then(response => response.json())
      .then((data) => {
        if (!data.errors) {
          dispatch(updateEndpointParamAction(data));
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

export function removeEndpoint() {
  return (dispatch, getState) => {
    const { id } = getState().endpointView;
    const name = getState().projects.activeProject.name;
    const url = urlFormatProjectName(name);
    const options = {
      method: 'DELETE',
    };

    dispatch(setEndpointView({ isFetching: false }));

    http(`/api/v1/endpoints/${id}`, options)
      .then(response => response.json())
      .then(() => {
        // Redirect only when user stayed on the same page
        if (id === getState().endpointView.id) {
          browserHistory.push(url);
        }
        dispatch(removeEndpointAction(id));
      });
  };
}

export function removeResponse(id) {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
    };

    dispatch(setEndpointView({ isFetching: true }));

    http(`/api/v1/responses/${id}`, options)
      .then(response => response.json())
      .then(() => {
        dispatch(setEndpointView({ isFetching: false }));
        dispatch(removeResponseAction(id));
      });
  };
}

export function addResponse(responseParam) {
  return (dispatch, getState) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(responseParam),
    };

    dispatch(setEndpointView({ isFetching: true }));

    http('/api/v1/responses/', options)
      .then(response => response.json())
      .then((data) => {
        if (!data.errors) {
          const name = getState().projects.activeProject.name;
          const endpointId = responseParam.endpoint_id;
          const url = `/${urlFormatProjectName(name)}/editor/undefined/endpoint/${endpointId}/response/${data.id}`;

          browserHistory.push(url);
          dispatch(setEndpointView({ isFetching: false }));
          dispatch(addResponseAction(data));
        }
      });
  };
}
