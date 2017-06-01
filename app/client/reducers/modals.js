import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from 'actions/modals';

const INITIAL_STATE = {
  refId: null,
};

export function modals(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case OPEN_MODAL: return openModal(state, payload);
    case CLOSE_MODAL: return closeModal(state, payload);
    default: return state;
  }
}

function openModal(state, payload) {
  return {
    ...state,
    [payload.id]: true,
    refId: payload.refId,
  };
}

function closeModal(state, id) {
  return {
    ...state,
    [id]: false,
    refId: null,
  };
}
