import {
  setRequest as setRequestAction,
  setStatus as setStatusAction,
  reset as resetAction,
  setBaseSchema as setBaseSchemaAction,
  setDraftSchema as setDraftSchemaAction,
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
        dispatch(setRequestAction(data));
      });
  };
}

export function saveJson(id, json) {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        body: JSON.stringify(json),
      }),
    };

    return http(`/api/v1/endpoints/${id}/request`, options)
      .then(response => response.json())
      .then((response) => {
        dispatch(setBaseSchemaAction(response.body));
        dispatch(setDraftSchemaAction(response.body_draft));
      });
  };
}
