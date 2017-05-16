import {
  setRequest as setRequestAction,
  setStatus as setStatusAction,
  reset as resetAction,
} from 'actions/requestEditor';
import {
  setRequest,
} from 'actions/endpointEditor';

import http from 'services/http';

export function reset() {
  return (dispatch) => {
    dispatch(resetAction());
  };
}

export function setStatus(value) {
  return (dispatch) => {
    dispatch(setStatusAction(value));
  };
}

export function saveRequest() {
  return (dispatch, getState) => {
    const {
      requestParams,
    } = getState();

    if (!requestParams.id) {
      requestParams.id = (new Date()).getTime();
      const newRequest = requestParams;
      dispatch(setRequest(newRequest));
    } else {
      dispatch(setRequest(requestParams));
    }

    dispatch(resetAction());
  };
}

export function loadRequest(id) {
  return (dispatch) => {
    dispatch(resetAction());

    http(`/api/v1/endpoints/${id}/request`)
      .then(response => response.json())
      .then((data) => {
        const elem = {
          base: data.body,
          draft: data.body_draft,
          headers: data.headers,
        };

        dispatch(setRequestAction(elem));
      });
  };
}

export function saveJson(id, json) {
  return () => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        body: JSON.stringify(json),
      }),
    };

    http(`/api/v1/endpoints/${id}/request`, options)
      .then(response => response.json())
      .then(() => {
        // Do something with data
      });
  };
}
