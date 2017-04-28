import http from 'services/http';
import { browserHistory } from 'react-router';

import {
  setEndpointView,
  addEndpointParam as addEndpointParamAction,
  updateEndpointParam as updateEndpointParamAction,
  removeEndpointParam as removeEndpointParamAction,
} from 'actions/endpointView';

import {
  urlFormatProjectName,
} from 'services/projects';

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

    http(`/api/v1/endpoints/${id}`, options)
      .then(response => response.json())
      .then(() => {
        browserHistory.push(url);
      });
  };
}
