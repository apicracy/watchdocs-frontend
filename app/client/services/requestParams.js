import {
  setRequest as setRequestAction,
  setStatus as setStatusAction,
  setHeaders as setHeadersAction,
  reset,
} from 'actions/requestParams';
import {
  setRequests,
} from 'actions/endpointView';

export function setStatus(value) {
  return (dispatch) => {
    dispatch(setStatusAction(value));
  };
}

export function addHeader(header) {
  return (dispatch, getState) => {
    const newHeaders = [].concat(getState().requestParams.headers);
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
      const newRequest = [].concat(endpointView.requests);
      newRequest.push(requestParams);
      dispatch(setRequests(newRequest));
    } else {
      const newRequest = endpointView.requests
        .map(param => ((param.id === requestParams.id) ? requestParams : param));

      dispatch(setRequests(newRequest));
    }

    dispatch(reset());
  };
}

export function setRequestParam(id) {
  return (dispatch, getState) => {
    const {
      requests,
    } = getState().endpointView;

    const elem = requests.find(param => param.id.toString() === id);
    dispatch(setRequestAction(elem));
  };
}
