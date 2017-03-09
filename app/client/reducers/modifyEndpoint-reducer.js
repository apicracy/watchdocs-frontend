import {
  SET_VISIBILITY,
  SET_TYPE,
  SET_FOLDER_NAME,
  SET_PARENT_FOLDER,
  SET_METHOD,
  SET_URL,
  RESET,
} from 'actions/modifyEndpoint-actions';

export const INITIAL_STATE = {
  isVisible: false,
  type: 'Endpoint',
  folderName: '',
  parentFolder: '',
  method: '',
  url: '',
};


export function endpoints(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_VISIBILITY: return { ...state, isVisible: payload };
    case SET_TYPE: return { ...state, type: payload };
    case SET_FOLDER_NAME: return { ...state, folderName: payload };
    case SET_PARENT_FOLDER: return { ...state, parentFolder: payload };
    case SET_METHOD: return { ...state, method: payload };
    case SET_URL: return { ...state, url: payload };
    case RESET: return INITIAL_STATE;
    default: return state;
  }
}
