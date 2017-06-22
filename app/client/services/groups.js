import http from 'services/http';
import { fetchEndpoints } from 'services/endpointsTree';
import { browserHistory } from 'react-router';

export function createGroup(groupParams) {
  return (dispatch, getState) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(groupParams),
    };

    const projectSlug = getState().projects.activeProject.slug;
    let groupIdToOpen;

    return http('/api/v1/groups/', options)
      .then(response => response.json())
      .then((group) => {
        groupIdToOpen = group.id;

        return dispatch(fetchEndpoints(group.project_id));
      }) // We have to wait for endpoints list as it contains group data.
      .then(() => {
        browserHistory.push(`${projectSlug}/editor/group/${groupIdToOpen}`);
      });
  };
}
