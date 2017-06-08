import {
  TOGGLE_VISIBILITY,
  SET_ENDPOINT_EDITOR,
  ADD_ENDPOINT_PARAM,
  UPDATE_ENDPOINT_PARAM,
  UPDATE_ENDPOINT_DESCRIPTION,
  ADD_RESPONSE,
  UPDATE_RESPONSE,
  ADD_REQUEST,
  UPDATE_REQUEST,
  SET_RESPONSES,
  SET_REQUEST,
  REMOVE_ENDPOINT_PARAM,
  REMOVE_RESPONSE,
} from 'actions/endpointEditor';

const INITIAL_STATE = {
  isOpen: false,
  isDirty: false,
  method: '',
  url_params: [],
  responses: [],
  request: {},
  id: null,
  status: '',
  parentId: null,
  description: null,
};

export function endpointEditor(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_VISIBILITY: return setEditorVisibility(state, payload);
    case SET_ENDPOINT_EDITOR: return setEndpointEditor(state, payload);
    case ADD_ENDPOINT_PARAM: return addEndpointParam(state, payload);
    case UPDATE_ENDPOINT_PARAM: return updateEndpointParam(state, payload);
    case UPDATE_ENDPOINT_DESCRIPTION: return updateEndpointDescription(state, payload);
    case ADD_RESPONSE: return addResponse(state, payload);
    case UPDATE_RESPONSE: return updateResponse(state, payload);
    case ADD_REQUEST: return addRequest(state, payload);
    case UPDATE_REQUEST: return updateRequest(state, payload);
    case SET_RESPONSES: return setResponses(state, payload);
    case SET_REQUEST: return setRequest(state, payload);
    case REMOVE_ENDPOINT_PARAM: return removeEndpointParam(state, payload);
    case REMOVE_RESPONSE: return removeResponse(state, payload);
    default: return state;
  }
}

function setEditorVisibility(state, visibilityFlag) {
  return {
    ...state,
    isOpen: visibilityFlag,
  };
}

function removeEndpointParam(state, payload) {
  const params = state.url_params.filter(p => p.id !== payload);
  return {
    ...state,
    url_params: params,
  };
}

function removeResponse(state, payload) {
  const responses = state.responses.filter(r => r.id !== payload);
  return {
    ...state,
    responses,
  };
}

function setRequest(state, payload) {
  return {
    ...state,
    request: payload,
  };
}

function setResponses(state, payload) {
  return {
    ...state,
    responses: payload,
  };
}

function setEndpointEditor(state, payload) {
  const newEndpointView = payload || {};

  return {
    ...state,
    ...newEndpointView,
  };
}

function addEndpointParam(state, payload) {
  return {
    ...state,
    isDirty: true,
    url_params: [
      ...state.url_params,
      {
        ...payload,
      },
    ],
  };
}

function updateEndpointParam(state, payload) {
  const params = state.url_params.filter(p => p.id !== payload.id);
  return {
    ...state,
    isDirty: true,
    url_params: [
      ...params,
      {
        ...payload,
      },
    ],
  };
}


function updateEndpointDescription(state, payload) {
  return {
    ...state,
    isDirty: true,
    description: payload,
  };
}

function addResponse(state, payload) {
  return {
    ...state,
    isDirty: true,
    responses: [
      ...state.responses,
      {
        ...payload,
      },
    ],
  };
}

function updateResponse(state, payload) {
  const responses = state.responses.filter(p => p.id !== payload.id);
  return {
    ...state,
    isDirty: true,
    responses: [
      ...responses,
      {
        ...payload,
      },
    ],
  };
}

function addRequest(state, payload) {
  return {
    ...state,
    isDirty: true,
    request: payload,
  };
}

function updateRequest(state, payload) {
  return {
    ...state,
    isDirty: true,
    request: payload,
  };
}
