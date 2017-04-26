import {
  setType as setTypeAction,
  setParentFolder as setParentFolderAction,
  setFolderName as setFolderNameAction,
  setUrl as setUrlAction,
  setMethod as setMethodAction,
  setEditMode as setEditModeAction,
  setDocumentName as setDocumentNameAction,
  reset,
} from 'actions/modifyEndpoint-actions';
import {
  filterById,
} from 'services/endpoint-service';

import http from 'services/http';
import { browserHistory } from 'react-router';
import { urlFormatProjectName } from 'services/projects';

export function addNewEndpoint() {
  return (dispatch /* , getState */) => {
    dispatch(setType('Endpoint'));
    dispatch(setEditModeAction(false));
  };
}

export function addNewGroup() {
  return (dispatch /* , getState */) => {
    dispatch(setType('Folder'));
    dispatch(setEditModeAction(false));
  };
}

export function addNewDocument() {
  return (dispatch /* , getState */) => {
    dispatch(setType('Document'));
    dispatch(setEditModeAction(false));
  };
}

export function saveEndpoint(project_name) {
  return (dispatch, getState) => {
    const endpoint = getState().modifyEndpoint;
    const activeProject = getState().projects.activeProject;

    http('/api/v1/endpoints', {
      method: 'POST',
      body: JSON.stringify({
        project_id: activeProject.id,
        url: endpoint.url,
        http_method: endpoint.method || 'GET',
      }),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(reset());
        browserHistory.push(
          `/${urlFormatProjectName(activeProject.name)}/editor/undefined/endpoint/${response.id}`
        );
      });
  };
}

const formatParams = (params) => {
  if (params && params.length > 0) {
    const formatted = params.map(param => `:${param}`);

    return `/(${formatted.join(', ')})`;
  }

  return '';
};

export function loadEndpoint(id) {
  return (dispatch, getState) => {
    const { endpoints } = getState();
    const newEndpoints = [].concat(endpoints);
    const data = filterById(newEndpoints, id);
    const params = formatParams(data.params);

    dispatch(setUrlAction(params));
    dispatch(setType('Endpoint'));
    // TODO set parent Folder
    // dispatch(setParentFolder(data.groupName));
    dispatch(setMethodAction(data.method));
    dispatch(setEditModeAction(true));
  };
}

export function loadFolder(id) {
  return (dispatch, getState) => {
    const { endpoints } = getState();
    const newEndpoints = [].concat(endpoints);
    const data = filterById(newEndpoints, id);

    dispatch(setFolderNameAction(data.groupName));
    // TODO set parent Folder
    // dispatch(setParentFolder(data.groupName));
    dispatch(setType('Folder'));
    dispatch(setEditModeAction(true));
  };
}

export function cancel() {
  return (dispatch /* , getState */) => {
    dispatch(reset());
  };
}

export function setType(type) {
  return (dispatch /* , getState */) => {
    dispatch(setTypeAction(type));
  };
}

export function setParentFolder(folderName) {
  return (dispatch /* getState */) => {
    dispatch(setParentFolderAction(folderName));
  };
}

export function setUrl(url) {
  return (dispatch /* getState */) => {
    dispatch(setUrlAction(url));
  };
}

export function setDocumentName(title) {
  return (dispatch /* getState */) => {
    dispatch(setDocumentNameAction(title));
  };
}

export function setFolderName(folderName) {
  return (dispatch /* getState */) => {
    dispatch(setFolderNameAction(folderName));
  };
}

export function setMethod(method) {
  return (dispatch /* getState */) => {
    dispatch(setMethodAction(method));
  };
}
