import http from 'services/http';
import { fetchEndpoints } from 'services/endpointsTree';

export function createGroup(groupParams) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(groupParams),
    };

    return http('/api/v1/groups/', options)
      .then(response => response.json())
      .then((group) => {
        dispatch(fetchEndpoints(group.project_id));
      });
  };
}
