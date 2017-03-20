/**
 * endpointView Actions
 */

export const FETCH_PROJECTS = 'fetch@projects';
export const SET_ACTIVE_PROJECT = 'setActive@projects';

export function fetchProjects(projects) {
  return {
    type: FETCH_PROJECTS,
    payload: projects,
  };
}

export function setActive(project) {
  return {
    type: SET_ACTIVE_PROJECT,
    payload: project,
  };
}
