import {
  setName,
  setDescription,
} from 'actions/documentView';

import { filterById } from 'services/endpoint-service';

export function loadDocument(id) {
  return (dispatch, getState) => {
    const { endpoints } = getState();
    const document = filterById([...endpoints], id);
    if (document) {
      dispatch(setName(document.name));
      dispatch(setDescription(document.text));
    }
  };
}
