import { browserHistory } from 'react-router';
import http from 'services/http';

import {
  fetchProjects as load,
  create,
  setActive,
  updateActive,
} from 'actions/projects';

import { setFetching as setAppLayoutFetching } from 'actions/appLayout';
import { clearEndpoints } from 'actions/endpointsTree';
import { flattenTree, fetchEndpoints } from 'services/endpointsTree';

export function loadProjects(slugToActivate) {
  return dispatch => http('/api/v1/projects')
    .then(response => response.json())
    .then((projects) => {
      const projectToActivate = projects.find(p => p.slug === slugToActivate) || projects[0];
      dispatch(load(projects));

      if (projectToActivate) {
        dispatch(setActiveProject(projectToActivate.slug));
      } else {
        browserHistory.push('/new_project');
      }
    });
}

export function setActiveProject(slug) {
  return (dispatch, getState) => {
    const project = getState().projects.projectList.find(p => p.slug === slug);
    return Promise.all([
      dispatch(clearEndpoints()),
      dispatch(setActive(project)),
      dispatch(fetchEndpoints(project.id)),
    ]);
  };
}

export function createProject(projectParams) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(projectParams),
    };

    return http('/api/v1/projects/', options)
      .then(response => response.json())
      .then((project) => {
        dispatch(create(project));
        browserHistory.push(`/${project.slug}`);
      });
  };
}

export function updateProject(projectId, projectParams) {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(projectParams),
    };

    return http(`/api/v1/projects/${projectId}`, options)
      .then(response => response.json())
      .then((project) => {
        dispatch(updateActive(project));
      });
  };
}

export function removeProject(projectId) {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
    };

    dispatch(setAppLayoutFetching(true));

    return http(`/api/v1/projects/${projectId}`, options)
      .then(response => response.json())
      .then(() => dispatch(loadProjects()))
      .then(() => dispatch(setAppLayoutFetching(false)))
      .catch((error) => {
        dispatch(setAppLayoutFetching(false));
        return Promise.reject(error);
      });
  };
}

export function openFirstEndpoint(slug, endpoints) {
  const endpointToOpen = flattenTree(endpoints).find(x => x.type === 'Endpoint');

  if (endpointToOpen) {
    browserHistory.push(`/${slug}/editor/endpoint/${endpointToOpen.id}`);
  } else {
    browserHistory.push(`/${slug}/setup-instructions`);
  }
}
