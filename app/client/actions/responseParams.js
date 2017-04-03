export const SET_RESPONSE = 'setResponse@responseParam';
export const SET_STATUS = 'setStatus@responseParam';
export const SET_BASE_SCHEMA = 'setBaseSchema@responseParam';
export const SET_DRAFT_SCHEMA = 'setDraftSchema@responseParam';
export const SET_HEADERS = 'setHeaders@responseParam';
export const RESET = 'reset@responseParam';

export function setResponse(data) {
  return {
    type: SET_RESPONSE,
    payload: data,
  };
}

export function setStatus(value) {
  return {
    type: SET_STATUS,
    payload: value,
  };
}

export function setBaseSchema(value) {
  return {
    type: SET_BASE_SCHEMA,
    payload: value,
  };
}

export function setDraftSchema(value) {
  return {
    type: SET_DRAFT_SCHEMA,
    payload: value,
  };
}

export function setHeaders(value) {
  return {
    type: SET_HEADERS,
    payload: value,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}
