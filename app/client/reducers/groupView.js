import {
  LOAD_GROUP_VIEW
} from 'actions/groupView';

const INITIAL_STATE = {
  id: null,
  groupName: '',
  groupPath: '',
  endpoints: [],
  fullPath: '',
};

export function groupView(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_GROUP_VIEW: return loadGroupView(payload);
    default: return state;
  }
}

function loadGroupView(payload) {
  return { ...payload };
}
