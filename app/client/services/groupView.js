import { loadGroupView } from 'actions/groupView';

import { filterById } from 'services/endpoint-service';

export function loadGroup(id) {
  return (dispatch, getState) => {
    const { endpoints } = getState();
    const group = filterById([...endpoints], id);


    dispatch(loadGroupView(group));
  };
}
