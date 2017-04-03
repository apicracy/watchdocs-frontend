import {
  SET_REQUEST,
  SET_STATUS,
  SET_BASE_SCHEMA,
  SET_DRAFT_SCHEMA,
  SET_HEADERS,
  RESET,
} from 'actions/requestParams';

const INITIAL_STATE = {
  status: {},
  base: {
    id: 'User',
    type: 'object',
    properties: {
      username: {
        type: 'integer',
      },
      streetAddress: {
        type: 'string',
      },
    },
    required: ['username'],
  },
  draft: {
    id: 'User',
    type: 'object',
    properties: {
      username: {
        type: 'integer',
      },
      streetAddress: {
        type: 'string',
      },
    },
    required: ['username'],
  },
  headers: [],
};

export function requestParams(state = INITIAL_STATE, action) {
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
