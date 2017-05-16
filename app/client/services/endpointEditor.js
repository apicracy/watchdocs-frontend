import http from 'services/http';
import { browserHistory } from 'react-router';

import {
  setEndpointEditor,
  addEndpointParam as addEndpointParamAction,
  updateEndpointParam as updateEndpointParamAction,
  removeEndpointParam as removeEndpointParamAction,
  updateEndpointDescription as updateEndpointDescriptionAction,
  addResponse as addResponseAction,
  removeResponse as removeResponseAction,
} from 'actions/endpointEditor';

import { fetchEndpoints } from 'services/endpoints';
import { urlFormatProjectName } from 'services/projects';

export function loadEndpoint(id) {
  return (dispatch) => {
    dispatch(setEndpointEditor({
      isFetching: true,
    }));

    http(`/api/v1/endpoints/${id}`)
      .then(response => response.json())
      .then((data) => {
        dispatch(setEndpointEditor({ ...data, isFetching: false }));
      });
  };
}

export function addEndpointParam(endpointParam) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(endpointParam),
    };

    return http('/api/v1/url_params/', options)
      .then(response => response.json())
      .then((data) => {
        dispatch(addEndpointParamAction(data));
      });
  };
}

export function updateEndpointParam(endpointParam) {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(endpointParam),
    };

    dispatch(setEndpointEditor({ isFetching: true }));
    return http(`/api/v1/url_params/${endpointParam.id}`, options)
      .then(response => response.json())
      .then((data) => {
        dispatch(updateEndpointParamAction(data));
        dispatch(setEndpointEditor({ isFetching: false }));
      })
      .catch(() => {
        // Remove after redux-form integration
        dispatch(setEndpointEditor({ isFetching: false }));
        return Promise.reject([]);
      });
  };
}

export function removeUrlParams(id) {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
    };

    dispatch(setEndpointEditor({ isFetching: true }));
    return http(`/api/v1/url_params/${id}`, options)
      .then(response => response.json())
      .then(() => {
        dispatch(removeEndpointParamAction(id));
        dispatch(setEndpointEditor({ isFetching: false }));
      })
      .catch(() => {
        // Remove after redux-form integration
        dispatch(setEndpointEditor({ isFetching: false }));
        return Promise.reject([]);
      });
  };
}

export function removeEndpoint() {
  return (dispatch, getState) => {
    const { id } = getState().endpointEditor;
    const name = getState().projects.activeProject.name;
    const url = urlFormatProjectName(name);
    const options = {
      method: 'DELETE',
    };

    dispatch(setEndpointEditor({ isFetching: false }));

    return http(`/api/v1/endpoints/${id}`, options)
      .then(response => response.json())
      .then(() => {
        // Redirect only when user stayed on the same page
        if (id === getState().endpointEditor.id) {
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

    dispatch(setEndpointEditor({ isFetching: true }));

    return http(`/api/v1/responses/${id}`, options)
      .then(response => response.json())
      .then(() => {
        dispatch(setEndpointEditor({ isFetching: false }));
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

    dispatch(setEndpointEditor({ isFetching: true }));

    return http('/api/v1/responses/', options)
      .then(response => response.json())
      .then((data) => {
        const name = getState().projects.activeProject.name;
        const endpointId = responseParam.endpoint_id;
        const url = `/${urlFormatProjectName(name)}/editor/undefined/endpoint/${endpointId}/response/${data.id}`;

        browserHistory.push(url);
        dispatch(setEndpointEditor({ isFetching: false }));
        dispatch(addResponseAction(data));
      })
      .catch(() => {
        // Remove after redux-form integration
        dispatch(setEndpointEditor({ isFetching: false }));
        return Promise.reject([]);
      });
  };
}

export function updateEndpointDescription(description) {
  return (dispatch, getState) => {
    const { id } = getState().endpointEditor;
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        title: description.title,
        summary: description.content,
      }),
    };
    dispatch(setEndpointEditor({ isFetching: true }));
    return http(`/api/v1/endpoints/${id}`, options)
      .then(response => response.json())
      .then(() => {
        dispatch(updateEndpointDescriptionAction(description));
        dispatch(setEndpointEditor({ isFetching: false }));
      })
      .catch(() => {
        // Remove after redux-form integration
        dispatch(setEndpointEditor({ isFetching: false }));
        return Promise.reject([]);
      });
  };
}
