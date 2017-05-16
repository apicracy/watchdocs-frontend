import {
  SET_RESPONSE,
  SET_STATUS,
  SET_BASE_SCHEMA,
  SET_DRAFT_SCHEMA,
  SET_HEADERS,
  RESET,
} from 'actions/responseEditor';

const INITIAL_STATE = {
  status: '',
  base: null,
  draft: null,
  headers: [],
};

export function responseEditor(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_RESPONSE: return setResponse(state, payload);
    case SET_STATUS: return setStatus(state, payload);
    case SET_BASE_SCHEMA: return setBaseSchema(state, payload);
    case SET_DRAFT_SCHEMA: return setDraftSchema(state, payload);
    case SET_HEADERS: return setHeaders(state, payload);
    case RESET: return INITIAL_STATE;
    default: return state;
  }
}

function setResponse(state, payload) {
  return {
    ...payload,
  };
}

function setStatus(state, payload) {
  return {
    ...state,
    status: payload,
  };
}

function setBaseSchema(state, payload) {
  return {
    ...state,
    base: payload,
  };
}

function setDraftSchema(state, payload) {
  return {
    ...state,
    draft: payload,
  };
}

function setHeaders(state, payload) {
  return {
    ...state,
    headers: payload,
  };
}
