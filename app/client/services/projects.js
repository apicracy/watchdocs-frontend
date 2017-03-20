import {
  fetchProjects as load,
  setActive,
 } from 'actions/projects';

import { fetchEndpoints } from 'services/endpoints';

export function fetchProjects() {
  return (dispatch) => {
    fetch('/projects')
      .then(response => response.json())
      .then((data) => {
        const cachedActiveId = getActiveProject(data);
        const projects = parseProjects(data, cachedActiveId);

        dispatch(load(projects));
        dispatch(fetchEndpoints(cachedActiveId));
      });
  };
}

export function setActiveProject(id) {
  return (dispatch, getState) => {
    localStorage.setItem('activeProject', id);
    const state = getState().projects.map(v => ({
      ...v,
      active: (v.id === id),
    }));

    dispatch(setActive(state));
    dispatch(fetchEndpoints(id));
  };
}

function getActiveProject(data) {
  return parseInt(localStorage.getItem('activeProject'), 10) || data.reduce((v, i) => {
    if (v < i.id) return i.id;

    return v;
  }, 0);
}

function parseProjects(data, activeId) {
  return data.map(project => ({
    ...project,
    name: `${project.name} ${project.version}`,
    active: (project.id === activeId),
  }));
}
