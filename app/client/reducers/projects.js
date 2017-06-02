import {
  FETCH_PROJECTS,
  SET_ACTIVE_PROJECT,
  CREATE_PROJECT,
} from 'actions/projects';

const INITIAL_STATE = {
  activeProject: {},
  projectList: [],
};

export function projects(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PROJECTS: return fetchProjects(state, payload);
    case SET_ACTIVE_PROJECT: return setActive(state, payload);
    case CREATE_PROJECT: return create(state, payload);
    default: return state;
  }
}

function fetchProjects(state, payload) {
  return {
    ...state,
    projectList: [...payload],
  };
}

function setActive(state, payload) {
  return {
    ...state,
    activeProject: {
      ...payload,
    },
  };
}

function create(state, payload) {
  return {
    ...state,
    projectList: [...state.projectList, payload],
  };
}
