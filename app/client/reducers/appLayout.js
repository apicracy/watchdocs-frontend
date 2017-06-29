import {
  SET_TITLES
} from 'actions/appLayout';

const INITIAL_STATE = {
  title: null,
  subtitle: null
};

export function appLayout(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TITLES: return setTitles(state, payload);
    default: return state;
  }
}

function setTitles(state, { title, subtitle }) {
  return {
    ...state,
    title: title,
    subtitle: subtitle,
  };
}
