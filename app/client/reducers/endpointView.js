import {
  SET_ENDPOINT_VIEW,
  ADD_ENDPOINT_PARAM,
  UPDATE_ENDPOINT_PARAM,
  UPDATE_ENDPOINT_DESCRIPTION,
} from 'actions/endpointView';

const INITIAL_STATE = {
  isDirty: false,
  method: '',
  params: [],
  id: null,
  status: '',
  parentId: null,
  description: null,
};

export function endpointView(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ENDPOINT_VIEW: return setEndpointView(payload);
    case ADD_ENDPOINT_PARAM: return addEndpointParam(state, payload);
    case UPDATE_ENDPOINT_PARAM: return updateEndpointParam(state, payload);
    case UPDATE_ENDPOINT_DESCRIPTION: return updateEndpointDescription(state, payload);
    default: return state;
  }
}

function setEndpointView(payload) {
  return {
    ...payload,
  };
}

function addEndpointParam(state, payload) {
  return {
    ...state,
    isDirty: true,
    params: [
      ...state.params,
      {
        ...payload,
      },
    ],
  };
}

function updateEndpointParam(state, payload) {
  const params = state.params.filter(p => p.id !== payload.id);
  return {
    ...state,
    isDirty: true,
    params: [
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
