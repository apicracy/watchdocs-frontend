import {
  setResponse as setResponseAction,
  setStatus as setStatusAction,
  setHeaders as setHeadersAction,
  reset as resetAction,
} from 'actions/responseParams';
import {
  setResponses,
} from 'actions/endpointView';

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

    dispatch(resetAction());
  };
}

export function setResponseParam(id) {
  return (dispatch) => {
    // const {
    //   responses,
    // } = getState().endpointView;
    dispatch(resetAction());

    const jwtToken = localStorage.getItem('JWT');
    const init = {
      headers: {
        authorization: jwtToken,
      },
    };

    fetch(`http://watchdocs-backend-dev.herokuapp.com/api/v1/responses/${id}`, init)
      .then(response => response.json())
      .then((data) => {
        // console.log(data);
        const elem2 = {
          status: data.http_status_code,
          base: data.body,
          draft: data.body_draft,
          headers: data.headers,
        };

        // const elem = responses.find(param => param.id.toString() === id);
        dispatch(setResponseAction(elem2));
      });
  };
}


export function addParam(id) {
  return (dispatch, getState) => {
    const {
      headers,
    } = getState().responseParams;

    const elem = headers.find(param => param.id === id);
    const newHeaders = headers
      .map(param => ((param.id === id) ? { ...elem, isNew: false } : param));
    dispatch(setHeadersAction(newHeaders));
  };
}
