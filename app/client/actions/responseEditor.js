export const SET_RESPONSE = 'setResponse@responseEditor';
export const SET_STATUS = 'setStatus@responseEditor';
export const SET_BASE_SCHEMA = 'setBaseSchema@responseEditor';
export const SET_DRAFT_SCHEMA = 'setDraftSchema@responseEditor';
export const RESET = 'reset@responseEditor';

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

export function reset() {
  return {
    type: RESET,
  };
}
