import {
  SET_REQUEST,
  SET_STATUS,
  SET_BASE_SCHEMA,
  SET_DRAFT_SCHEMA,
  SET_HEADERS,
  RESET,
} from 'actions/requestEditor';

const INITIAL_STATE = {
  base: null,
  draft: null,
  headers: [],
};

export function requestEditor(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_REQUEST: return setRequest(state, payload);
    case SET_STATUS: return setStatus(state, payload);
    case SET_BASE_SCHEMA: return setBaseSchema(state, payload);
    case SET_DRAFT_SCHEMA: return setDraftSchema(state, payload);
    case SET_HEADERS: return setHeaders(state, payload);
    case RESET: return INITIAL_STATE;
    default: return state;
  }
}

function setRequest(state, payload) {
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
