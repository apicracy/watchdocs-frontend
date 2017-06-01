import {
  SET_GROUP_VIEW,
} from 'actions/groupEditor';

const INITIAL_STATE = {
  id: null,
  name: '',
  items: [],
  fullPath: '',
};

export function groupEditor(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_GROUP_VIEW: return setGroupView(payload);
    default: return state;
  }
}

function setGroupView(payload) {
  return { ...payload };
}
