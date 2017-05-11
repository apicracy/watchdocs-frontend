import {
  setResponse as setResponseAction,
  setStatus as setStatusAction,
  setHeaders as setHeadersAction,
  reset as resetAction,
} from 'actions/responseParams';
import http from 'services/http';

export function reset() {
  return (dispatch) => {
    dispatch(resetAction());
  };
}

export function acceptNewHeader(headerId) {
  return (dispatch, getState) => {
    const {
      headers,
    } = getState().responseParams;

    const elem = headers.find(header => header.id === headerId);
    const newHeaders = headers
      .map(header => ((header.id === headerId) ? { ...elem, isNew: false } : header));
    dispatch(setHeadersAction(newHeaders));
  };
}

export function addHeader(header) {
  return (dispatch, getState) => {
    let newHeaders = [];

    if (getState().requestParams.headers) {
      newHeaders = newHeaders.concat(getState().responseParams.headers);
    }

    newHeaders.push(header);
    dispatch(setHeadersAction(newHeaders));
  };
}

export function updateHeader(header) {
  return (dispatch, getState) => {
    const {
      headers,
    } = getState().responseParams;

    const newHeaders = headers.map(param => ((param.id === header.id) ? header : param));

    dispatch(setHeadersAction(newHeaders));
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
  return () => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        body: JSON.stringify(newSchema),
      }),
    };

    http(`/api/v1/responses/${responseId}`, options)
      .then(response => response.json())
      .then(() => {
        // Do something with data
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
