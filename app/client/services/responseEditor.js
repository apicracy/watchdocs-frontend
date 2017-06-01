import {
  setResponse as setResponseAction,
  setStatus as setStatusAction,
  reset as resetAction,
} from 'actions/responseEditor';
import http from 'services/http';
import {
  fetchEndpoints,
} from 'services/endpoints';

export function reset() {
  return (dispatch) => {
    dispatch(resetAction());
  };
}

export function loadResponse(responseId) {
  return (dispatch) => {
    dispatch(resetAction());

    http(`/api/v1/responses/${responseId}`)
      .then(response => response.json())
      .then((data) => {
        dispatch(setResponseAction(data));
      });
  };
}

export function updateJsonSchema(responseId, newSchema) {
  return (dispatch, getState) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        body: JSON.stringify(newSchema),
      }),
    };

    return http(`/api/v1/responses/${responseId}`, options)
      .then(response => response.json())
      .then((response) => {
        dispatch(fetchEndpoints(getState().projects.activeProject.id));
        dispatch(setResponseAction(response));
      });
  };
}

export function updateHttpStatus(responseId, newStatus) {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        http_status_code: newStatus,
      }),
    };

    return http(`/api/v1/responses/${responseId}`, options)
      .then(() => {
        dispatch(setStatusAction(newStatus));
      });
  };
}
