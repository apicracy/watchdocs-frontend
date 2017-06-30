import {
  SET_TITLES,
  SET_FETCHING,
} from 'actions/appLayout';

const INITIAL_STATE = {
  title: null,
  subtitle: null,
  isFetching: false,
};

export function appLayout(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TITLES: return setTitles(state, payload);
    case SET_FETCHING: return setFetching(state, payload);
    default: return state;
  }
}

function setTitles(state, { title, subtitle }) {
  return {
    ...state,
    title,
    subtitle,
  };
}

function setFetching(state, newFetching) {
  return {
    ...state,
    isFetching: newFetching,
  };
}
