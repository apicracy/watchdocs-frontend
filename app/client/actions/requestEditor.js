export const SET_REQUEST = 'setRequest@requestEditor';
export const SET_STATUS = 'setStatus@requestEditor';
export const SET_BASE_SCHEMA = 'setBaseSchema@requestEditor';
export const SET_DRAFT_SCHEMA = 'setDraftSchema@requestEditor';
export const RESET = 'reset@requestEditor';

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

export function reset() {
  return {
    type: RESET,
  };
}
