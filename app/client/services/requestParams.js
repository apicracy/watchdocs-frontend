import {
  setRequest as setRequestAction,
  setStatus as setStatusAction,
  setHeaders as setHeadersAction,
  reset as resetAction,
} from 'actions/requestParams';
import {
  setRequest,
} from 'actions/endpointView';

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

export function addHeader(header) {
  return (dispatch, getState) => {
    let newHeaders = [];

    if (getState().requestParams.headers) {
      newHeaders = newHeaders.concat(getState().requestParams.headers);
    }

    newHeaders.push(header);
    dispatch(setHeadersAction(newHeaders));
  };
}
export function updateHeader(header) {
  return (dispatch, getState) => {
    const {
      headers,
    } = getState().requestParams;

    const newHeaders = headers.map(param => ((param.id === header.id) ? header : param));

    dispatch(setHeadersAction(newHeaders));
  };
}

export function saveRequestParam() {
  return (dispatch, getState) => {
    const {
      requestParams,
      endpointView,
    } = getState();

    if (!requestParams.id) {
      requestParams.id = (new Date()).getTime();
      const newRequest = {
        ...endpointView.request,
      };
      newRequest.push(requestParams);
      dispatch(setRequest(newRequest));
    } else {
      dispatch(setRequest(requestParams));
    }

    dispatch(resetAction());
  };
}

export function setRequestParam(id) {
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

export function addParam(id) {
  return (dispatch, getState) => {
    const {
      headers,
    } = getState().requestParams;

    const elem = headers.find(param => param.id === id);
    const newHeaders = headers
      .map(param => ((param.id === id) ? { ...elem, isNew: false } : param));

    dispatch(setHeadersAction(newHeaders));
  };
}
