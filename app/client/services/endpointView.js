import { setEndpointView } from 'actions/endpointView';

import { filterById } from 'services/endpoint-service';

export function loadEndpoint(id) {
  return (dispatch, getState) => {
    const { endpoints } = getState();
    const endpoint = filterById([...endpoints], id);

    dispatch(setEndpointView(endpoint));
  };
}
