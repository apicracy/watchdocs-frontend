import http from 'services/http';

import { setEndpointView } from 'actions/endpointView';

export function loadEndpoint(id) {
  return (dispatch) => {
    dispatch(setEndpointView({
      isFetching: true,
    }));

    http(`/api/v1/endpoints/${id}`)
      .then(response => response.json())
      .then((data) => {
        dispatch(setEndpointView({ ...data, isFetching: false }));
      });
  };
}
