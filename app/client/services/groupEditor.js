import { setGroupEditor } from 'actions/groupEditor';
import http from 'services/http';
import { filterByIdAndType } from 'services/endpoint-service';

import {
  fetchEndpoints,
} from 'services/endpointsTree';

export function loadGroup(id) {
  return (dispatch, getState) => {
    const { endpoints } = getState();
    const group = filterByIdAndType([...endpoints], id, 'Group');

    dispatch(setGroupEditor(group));
  };
}

export function updateGroup(groupId, params) {
  return (dispatch, getState) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(params),
    };

    return http(`/api/v1/groups/${groupId}`, options).then(() => (
      dispatch(fetchEndpoints(getState().projects.activeProject.id))
    ));
  };
}
