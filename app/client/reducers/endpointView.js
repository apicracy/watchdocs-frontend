import {
  SET_ENDPOINT_VIEW,
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
    case SET_ENDPOINT_VIEW: return setEndpointView(payload);
    default: return state;
  }
}

function setEndpointView(payload) {
  return { ...payload };
}
