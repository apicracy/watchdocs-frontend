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
        const paramTypes = [
          { id: 200, name: '200 - OK' },
          { id: 201, name: '201 - Created' },
          { id: 204, name: '204 - No Content' },
          { id: 304, name: '304 - Not Modified' },
          { id: 400, name: '400 - Bad Request' },
          { id: 401, name: '401 - Unauthorized' },
          { id: 403, name: '403 - Forbidden' },
          { id: 404, name: '404 - Not Found' },
          { id: 409, name: '409 - Conflict' },
          { id: 422, name: '422 - Unauthorized' },
          { id: 500, name: '500 - Internal Server Error' },
        ];

        const elem2 = {
          status: paramTypes.filter(obj => ((data.http_status_code === obj.id) ? obj : null))[0],
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
