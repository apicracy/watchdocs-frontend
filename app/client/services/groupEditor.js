import { setGroupEditor, setFetchingFlag } from 'actions/groupEditor';
import http from 'services/http';
import { filterByIdAndType } from 'services/endpoint-service';
import { toastr } from 'react-redux-toastr';

import {
  fetchEndpoints,
} from 'services/endpointsTree';

import {
  openFirstEndpoint,
} from 'services/projects';

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

    return http(`/api/v1/groups/${groupId}`, options).then(() => {
      dispatch(fetchEndpoints(getState().projects.activeProject.id));
      toastr.success(
        'Group has been updated',
        'Your group documentation has been updated successfully.',
      );
    });
  };
}

export function removeGroup(groupId) {
  return (dispatch, getState) => {
    const activeProject = getState().projects.activeProject;
    const options = {
      method: 'DELETE',
    };

    dispatch(setFetchingFlag(true));

    return http(`/api/v1/groups/${groupId}`, options)
      .then(response => response.json())
      .then(() => {
        toastr.success(
          'Group has been removed',
          'Your group and its content has been removed',
        );
        // We have to wait for data as its fetched with endpoints
        return dispatch(fetchEndpoints(activeProject.id));
      })
      .then(() => {
        // When data is fetched, we see if user has not navigated away
        // if not navigated away, we jump to first endpoint
        if (groupId === getState().groupEditor.id) {
          openFirstEndpoint(activeProject.slug, getState().endpoints);
        }
      })
      .catch(() => {
        toastr.error(
          'Group was not removed',
          'There was an error with removing your group',
        );
      })
      .done(() => {
        dispatch(setFetchingFlag(false));
      });
  };
}
