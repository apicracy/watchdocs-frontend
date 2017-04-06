import {
  SET_NAME,
  SET_DESCRIPTION,
  RESET,
} from 'actions/documentView';

const INITIAL_STATE = {
  name: '',
  description: '',
};

export function documentView(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_NAME: return setName(state, payload);
    case SET_DESCRIPTION: return setDescription(state, payload);
    case RESET: return { ...INITIAL_STATE };
    default: return state;
  }
}

function setName(state, payload) {
  return {
    ...state,
    name: payload,
  };
}

function setDescription(state, payload) {
  return {
    ...state,
    description: payload,
  };
}
