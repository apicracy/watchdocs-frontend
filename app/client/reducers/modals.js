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
    case CLOSE_MODAL: return closeModal();
    default: return state;
  }
}

function openModal(state, payload) {
  return {
    ...state,
    opened: payload.id,
    refId: payload.refId,
  };
}

function closeModal() {
  return {
    ...INITIAL_STATE,
  };
}
