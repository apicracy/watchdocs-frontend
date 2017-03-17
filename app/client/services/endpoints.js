import Axios from 'axios';
import { loadEndpoints as load } from 'actions/endpoints';

export function loadEndpoints(projectId) {
  return (dispatch) => {
    Axios
      .get(`/endpoints/${projectId}`)
      .then((response) => {
        dispatch(load(response.data));
      });
  };
}
