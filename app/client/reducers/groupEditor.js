import {
  SET_GROUP_VIEW,
  SET_FETCHING_FLAG,
} from 'actions/groupEditor';

const INITIAL_STATE = {
  id: null,
  name: '',
  items: [],
  fullPath: '',
  isFetching: false,
};

export function groupEditor(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_GROUP_VIEW: return setGroupView(payload);
    case SET_FETCHING_FLAG: return setFetching(state, payload);
    default: return state;
  }
}

function setGroupView(payload) {
  return { ...payload };
}

function setFetching(state, newFlag) {
  return { ...state, isFetching: newFlag };
}
