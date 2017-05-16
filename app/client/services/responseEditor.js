import {
  setResponse as setResponseAction,
  setStatus as setStatusAction,
  reset as resetAction,
} from 'actions/responseEditor';
import {
  setResponses,
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

export function saveResponse() {
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

export function loadResponse(id) {
  return (dispatch) => {
    dispatch(resetAction());

    http(`/api/v1/responses/${id}`)
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

        dispatch(setResponseAction(elem2));
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

    http(`/api/v1/endpoints/${id}/response`, options)
      .then(response => response.json())
      .then(() => {
        // Do something with data
      });
  };
}
