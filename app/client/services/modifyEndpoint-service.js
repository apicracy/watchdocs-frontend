import {
  setType as setTypeAction,
  setParentFolder as setParentFolderAction,
  setFolderName as setFolderNameAction,
  setUrl as setUrlAction,
  setMethod as setMethodAction,
  setEditMode as setEditModeAction,
  setDocumentName as setDocumentNameAction,
  setEditMode,
  reset,
} from 'actions/modifyEndpoint-actions';
import {
  filterById,
} from 'services/endpoint-service';
import http from 'services/http';
import {
  setEndpointView,
} from 'actions/endpointView';

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

export function saveEndpoint() {
  return (dispatch /* , getState */) => {
    // TODO dispatch save action
    dispatch(reset());
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

export function setEdit(isEdit) {
  return (dispatch /* getState */) => {
    dispatch(setEditMode(isEdit));
  };
}

// export function editEndpoint() {
//   return (dispatch, getState) => {
//     const { url, method } = getState().modifyEndpoint;
//     const { modifyEndpoint, endpointView } = getState();
//
//     console.log('-----');
//     console.log('-API-');
//     console.log(modifyEndpoint);
//     console.log(endpointView);
//     console.log('-----');
//   };
// }

export function editEndpoint() {
  return (dispatch, getState) => {
    const { url, method } = getState().modifyEndpoint;
    const { id } = getState().endpointView;

    const options = {
      method: 'PUT',
      body: JSON.stringify({
        url,
        http_method: method,
      }),
    };

    http(`/api/v1/endpoints/${id}`, options)
      .then(response => response.json())
      .then((data) => {
        if (!data.errors) {
          dispatch(setEndpointView({
            url,
            method,
          }));
        }
      });
  };
}
