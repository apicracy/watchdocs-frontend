/**
 * endpointView Actions
 */

export const LOAD_PROJECTS = 'load@projects';
export const SET_ACTIVE_PROJECT = 'setActive@projects';

export function loadProjects(projects) {
  return {
    type: LOAD_PROJECTS,
    payload: projects,
  };
}

export function setActive(project) {
  return {
    type: SET_ACTIVE_PROJECT,
    payload: project,
  };
}
