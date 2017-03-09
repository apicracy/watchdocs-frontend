import {
  setVisibility as setVisibilityAction,
  setType as setTypeAction,
  setParentFolder as setParentFolderAction,
  setUrl as setUrlAction,
  setMethod as setMethodAction,
  reset,
} from 'actions/modifyEndpoint-actions';

export function setVisibility(value) {
  return (dispatch /* , getState */) => {
    dispatch(setVisibilityAction(value));
  };
}

export function saveEndpoint() {
  return (dispatch /* , getState */) => {
    // TODO dispatch save action
    dispatch(setVisibilityAction(false));
    dispatch(reset());
  };
}

export function cancel() {
  return (dispatch /* , getState */) => {
    dispatch(setVisibilityAction(false));
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

export function setMethod(method) {
  return (dispatch /* getState */) => {
    dispatch(setMethodAction(method));
  };
}
