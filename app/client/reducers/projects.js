import {
  FETCH_PROJECTS,
  SET_ACTIVE_PROJECT,
} from 'actions/projects';

const INITIAL_STATE = [];

export function projects(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PROJECTS: return fetchProjects(payload);
    case SET_ACTIVE_PROJECT: return setActive(payload);
    default: return state;
  }
}

function fetchProjects(payload) {
  return [...payload];
}

function setActive(payload) {
  return [...payload];
}
