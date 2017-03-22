import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from 'actions/modals';

const INITIAL_STATE = {};

export function modals(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case OPEN_MODAL: return openModal(state, payload);
    case CLOSE_MODAL: return closeModal(state, payload);
    default: return state;
  }
}

function openModal(state, id) {
  return {
    ...state,
    [id]: true,
  };
}

function closeModal(state, id) {
  return {
    ...state,
    [id]: false,
  };
}
