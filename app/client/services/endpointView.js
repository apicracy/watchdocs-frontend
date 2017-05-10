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

import { fetchEndpoints } from 'services/endpoints';
import { urlFormatProjectName } from 'services/projects';

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
    const options = {
      method: 'POST',
      body: JSON.stringify(endpointParam),
    };

    dispatch(setEndpointView({ isFetching: true }));
    return http('/api/v1/url_params/', options)
      .then(response => response.json())
      .then((data) => {
        dispatch(addEndpointParamAction(data));
        dispatch(setEndpointView({ isFetching: false }));
      })
      .catch(() => {
        // Remove after redux-form integration
        dispatch(setEndpointView({ isFetching: false }));
        return Promise.reject([]);
      });
  };
}

export function updateEndpointParam(endpointParam) {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(endpointParam),
    };

    dispatch(setEndpointView({ isFetching: true }));
    return http(`/api/v1/url_params/${endpointParam.id}`, options)
      .then(response => response.json())
      .then((data) => {
        dispatch(updateEndpointParamAction(data));
        dispatch(setEndpointView({ isFetching: false }));
      })
      .catch(() => {
        // Remove after redux-form integration
        dispatch(setEndpointView({ isFetching: false }));
        return Promise.reject([]);
      });
  };
}

export function removeUrlParams(id) {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
    };

    dispatch(setEndpointView({ isFetching: true }));
    return http(`/api/v1/url_params/${id}`, options)
      .then(response => response.json())
      .then(() => {
        dispatch(removeEndpointParamAction(id));
        dispatch(setEndpointView({ isFetching: false }));
      })
      .catch(() => {
        // Remove after redux-form integration
        dispatch(setEndpointView({ isFetching: false }));
        return Promise.reject([]);
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

    return http(`/api/v1/endpoints/${id}`, options)
      .then(response => response.json())
      .then(() => {
        // Redirect only when user stayed on the same page
        if (id === getState().endpointView.id) {
          browserHistory.push(url);
        }
        dispatch(fetchEndpoints(getState().projects.activeProject.id));
      });
  };
}

export function removeResponse(id) {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
    };

    dispatch(setEndpointView({ isFetching: true }));

    return http(`/api/v1/responses/${id}`, options)
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

    return http('/api/v1/responses/', options)
      .then(response => response.json())
      .then((data) => {
        const name = getState().projects.activeProject.name;
        const endpointId = responseParam.endpoint_id;
        const url = `/${urlFormatProjectName(name)}/editor/undefined/endpoint/${endpointId}/response/${data.id}`;

        browserHistory.push(url);
        dispatch(setEndpointView({ isFetching: false }));
        dispatch(addResponseAction(data));
      })
      .catch(() => {
        // Remove after redux-form integration
        dispatch(setEndpointView({ isFetching: false }));
        return Promise.reject([]);
      });
  };
}
