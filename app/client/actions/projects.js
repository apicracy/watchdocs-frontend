/**
 * endpointView Actions
 */

export const FETCH_PROJECTS = 'fetch@projects';
export const SET_ACTIVE_PROJECT = 'setActive@projects';
export const CREATE_PROJECT = 'create@projects';
export const CLEAR_PROJECTS = 'clear@projects';

export function fetchProjects(projects) {
  return {
    type: FETCH_PROJECTS,
    payload: projects,
  };
}

export function clearProjects() {
  return {
    type: CLEAR_PROJECTS,
  };
}

export function setActive(project) {
  return {
    type: SET_ACTIVE_PROJECT,
    payload: project,
  };
}

export function create(project) {
  return {
    type: CREATE_PROJECT,
    payload: project,
  };
}
