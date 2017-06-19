import { browserHistory } from 'react-router';
import http from 'services/http';

import {
  fetchProjects as load,
  create,
  setActive,
} from 'actions/projects';

import { clearEndpoints } from 'actions/endpointsTree';
import { flattenTree } from 'services/endpointsTree';

export function loadProjects(slugToActivate) {
  return dispatch => http('/api/v1/projects')
    .then(response => response.json())
    .then((data) => {
      const projects = data.map(project => ({ ...project, slug: projectSlug(project.name) }));
      const projectToActivate = projects.find(p => p.slug === slugToActivate) || projects[0];

      dispatch(load(projects));

      if (projectToActivate) {
        dispatch(setActiveProject(projectToActivate.id));
      } else if (projects.length) {
        browserHistory.push(`/projects-manager?notFound=${slugToActivate}`);
      } else {
        browserHistory.push('/new_project');
      }
    });
}

export function setActiveProject(id) {
  return (dispatch, getState) => {
    const project = getState().projects.projectList.find(p => p.id === id);
    dispatch(setActive(project));
    dispatch(clearEndpoints());
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
        browserHistory.push(`/${projectSlug(project.name)}`);
      });
  };
}

export function projectSlug(name) {
  if (!name) return null;

  const formatted = name
    .replace(/[A-Z]/g, match => `-${match}`)
    .replace(/\s/g, '-')
    .replace(/^-/, '')
    .toLowerCase();

  return formatted;
}

export function openFirstEndpoint(slug, endpoints) {
  const endpointToOpen = flattenTree(endpoints).find(x => x.type === 'Endpoint');

  if (endpointToOpen) {
    browserHistory.push(`/${slug}/editor/endpoint/${endpointToOpen.id}`);
  } else {
    browserHistory.push(`/${slug}/setup-instructions`);
  }
}
