import {
  SET_GROUP_VIEW,
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
    case SET_GROUP_VIEW: return setGroupView(payload);
    default: return state;
  }
}

function setGroupView(payload) {
  return { ...payload };
}
