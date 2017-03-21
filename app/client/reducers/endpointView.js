import {
  SET_ENDPOINT_VIEW,
  ADD_ENDPOINT_PARAM,
} from 'actions/endpointView';

const INITIAL_STATE = {
  isDirty: false,
  method: '',
  params: [],
  id: null,
  status: '',
  parentId: null,
};

export function endpointView(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ENDPOINT_VIEW: return setEndpointView(payload);
    case ADD_ENDPOINT_PARAM: return addEndpointParam(state, payload);
    default: return state;
  }
}

function setEndpointView(payload) {
  return {
    ...payload
  };
}

function addEndpointParam(state, payload) {
  return {
    ...state,
    isDirty: true,
    params: [
      ...state.params,
      {
        name: payload.name,
        required: payload.isRequired,
        type: 'string',
        main: false,
      }
    ]
  };
}
