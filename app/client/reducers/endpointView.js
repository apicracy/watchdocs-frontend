import {
  LOAD_ENDPOINT_VIEW,
} from 'actions/endpointView';

const INITIAL_STATE = {
  method: '',
  params: [],
  id: null,
  status: '',
  parentId: null,
};

export function endpointView(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ENDPOINT_VIEW: return loadEndpointView(payload);
    default: return state;
  }
}

function loadEndpointView(payload) {
  return { ...payload };
}
