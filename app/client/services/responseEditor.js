import {
  setResponse as setResponseAction,
  setStatus as setStatusAction,
  reset as resetAction,
  setBaseSchema as setBaseSchemaAction,
  setDraftSchema as setDraftSchemaAction,
} from 'actions/responseEditor';
import http from 'services/http';

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
  return (dispatch) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        body: JSON.stringify(newSchema),
      }),
    };

    return http(`/api/v1/responses/${responseId}`, options)
      .then(response => response.json())
      .then((response) => {
        dispatch(setBaseSchemaAction(response.body));
        dispatch(setDraftSchemaAction(response.body_draft));
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
