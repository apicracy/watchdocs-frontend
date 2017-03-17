import {
  loadProjects as load,
  setActive,
 } from 'actions/projects';

import { loadEndpoints } from 'services/endpoints';

import Axios from 'axios';

export function loadProjects() {
  return (dispatch) => {
    Axios
      .get('/projects')
      .then((response) => {
        const cachedActiveId = parseInt(localStorage.getItem('activeProject'), 10) || response.data.reduce((v, i) => {
          if (v < i.id) return i.id;

          return v;
        }, 0);

        const projects = response.data.map(project => ({
          ...project,
          name: `${project.name} ${project.version}`,
          active: (project.id === cachedActiveId),
        }));

        dispatch(load(projects));
        dispatch(loadEndpoints(cachedActiveId));
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
    dispatch(loadEndpoints(id));
  };
}
