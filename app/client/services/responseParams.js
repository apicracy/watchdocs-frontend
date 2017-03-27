import {
  setResponse as setResponseAction,
  setStatus as setStatusAction,
  setHeaders as setHeadersAction,
  reset,
} from 'actions/responseParams';
import {
  setResponses,
} from 'actions/endpointView';

export function setStatus(value) {
  return (dispatch) => {
    dispatch(setStatusAction(value));
  };
}

export function addHeader(header) {
  return (dispatch, getState) => {
    const newHeaders = [].concat(getState().responseParams.headers);
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

export function saveResponseParam() {
  return (dispatch, getState) => {
    const {
      responseParams,
      endpointView,
    } = getState();

    if (!responseParams.id) {
      responseParams.id = (new Date()).getTime();
      const newResponses = [].concat(endpointView.responses);
      newResponses.push(responseParams);
      dispatch(setResponses(newResponses));
    } else {
      const newResponses = endpointView.responses
        .map(param => ((param.id === responseParams.id) ? responseParams : param));

      dispatch(setResponses(newResponses));
    }

    dispatch(reset());
  };
}

export function setResponseParam(id) {
  return (dispatch, getState) => {
    const {
      responses,
    } = getState().endpointView;

    const elem = responses.find(param => param.id.toString() === id);
    dispatch(setResponseAction(elem));
  };
}
