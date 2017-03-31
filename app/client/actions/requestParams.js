export const SET_REQUEST = 'setRequest@requestParam';
export const SET_STATUS = 'setStatus@requestParam';
export const SET_BASE_SCHEMA = 'setBaseSchema@requestParam';
export const SET_DRAFT_SCHEMA = 'setDraftSchema@requestParam';
export const SET_HEADERS = 'setHeaders@requestParam';
export const RESET = 'reset@requestParam';

export function setRequest(data) {
  return {
    type: SET_REQUEST,
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
