import { browserHistory } from 'react-router';

import {
  fetchProjects as load,
  setActive,
 } from 'actions/projects';

import { fetchEndpoints } from 'services/endpoints';

export function fetchProjects(urlParam) {
  return (dispatch) => {
    fetch('/projects')
      .then(response => response.json())
      .then((data) => {
        let activeProjectFromCache = null;
        let activeProjectFromUrl = null;

        if (!urlParam) {
          activeProjectFromCache = getActiveProjectFromCache(data);
        } else {
          activeProjectFromUrl = getActiveProjectFromUrl(data, urlParam);
        }

        const projects = { ...data };
        const activeProject = activeProjectFromUrl || activeProjectFromCache;

        dispatch(load(projects));

        if (activeProject) {
          activateProject(dispatch, activeProject);
        } else {
          // project does not exist
          browserHistory.push(`/project-manager?not_found=${urlParam}`);
        }
      });
  };
}

export function setActiveProject(id) {
  return (dispatch, getState) => {
    const activeProject = getState().projects.projectList.find(p => p.id === id);
    activateProject(dispatch, activeProject);
  };
}

function activateProject(dispatch, project) {
  localStorage.setItem('activeProject', project.id);
  const currentPath = browserHistory.getCurrentLocation().pathname;

  if (!currentPath.includes(project.name)) {
    browserHistory.push(`${project.name}`);
  }

  dispatch(setActive(project));
  dispatch(fetchEndpoints(project.id));
}

function getActiveProjectFromCache(data) {
  const cached = parseInt(localStorage.getItem('activeProject'), 10);
  let activeProject = null;

  if (cached) {
    activeProject = data.find(project => project.id === cached);
  }

  return activeProject || data.reduce((v, project) => {
    if (v.id < project.id) return project;

    return v;
  }, { id: 0 });
}

function getActiveProjectFromUrl(data, name) {
  return data.reduce((v, project) => {
    if (project.name === name) return project;

    return v;
  }, null);
}
