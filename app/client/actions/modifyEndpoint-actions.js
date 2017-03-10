/**
 * modifyEndpoint Actions
 */

export const SET_VISIBILITY = 'setVisibility@modifyEndpoint';
export const SET_EDIT_MODE = 'setEditMode@modifyEndpoint';
export const SET_TYPE = 'setType@modifyEndpoint';
export const SET_FOLDER_NAME = 'setFolderName@modifyEndpoint';
export const SET_PARENT_FOLDER = 'setParentFolder@modifyEndpoint';
export const SET_METHOD = 'setMethod@modifyEndpoint';
export const SET_URL = 'setUrl@modifyEndpoint';
export const RESET = 'reset@modifyEndpoint';

export function setEditMode(value) {
  return {
    type: SET_EDIT_MODE,
    payload: value,
  };
}

export function setVisibility(value) {
  return {
    type: SET_VISIBILITY,
    payload: value,
  };
}

export function setType(value) {
  return {
    type: SET_TYPE,
    payload: value,
  };
}

export function setFolderName(value) {
  return {
    type: SET_FOLDER_NAME,
    payload: value,
  };
}

export function setParentFolder(value) {
  return {
    type: SET_PARENT_FOLDER,
    payload: value,
  };
}

export function setMethod(value) {
  return {
    type: SET_METHOD,
    payload: value,
  };
}

export function setUrl(value) {
  return {
    type: SET_URL,
    payload: value,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}
