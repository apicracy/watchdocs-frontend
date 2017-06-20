import {
  FETCH_PROJECTS,
  SET_ACTIVE_PROJECT,
  CREATE_PROJECT,
  CLEAR_PROJECTS,
  UPDATE_ACTIVE_PROJECT,
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
    case UPDATE_ACTIVE_PROJECT: return updateActiveProject(state, payload);
    case CREATE_PROJECT: return create(state, payload);
    case CLEAR_PROJECTS: return clearProjects();
    default: return state;
  }
}

function clearProjects() {
  return { ...INITIAL_STATE };
}

function fetchProjects(state, payload) {
  return {
    ...state,
    projectList: [...payload],
  };
}

function updateActiveProject(state, payload) {
  const activeProject = { ...state.activeProject, ...payload };
  const projectList = state.projectList.filter(p => p.id !== payload.id);

  return {
    ...state,
    activeProject: {
      ...activeProject,
    },
    projectList: [
      ...projectList,
      { ...payload },
    ],
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
