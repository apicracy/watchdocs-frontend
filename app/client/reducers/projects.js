import {
  LOAD_PROJECTS,
  SET_ACTIVE_PROJECT,
} from 'actions/projects';

const INITIAL_STATE = [];

export function projects(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_PROJECTS: return loadProjects(payload);
    case SET_ACTIVE_PROJECT: return setActive(payload);
    default: return state;
  }
}

function loadProjects(payload) {
  return [...payload];
}

function setActive(payload) {
  return [...payload];
}
