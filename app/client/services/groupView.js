import { setGroupView } from 'actions/groupView';

import { filterByIdAndType } from 'services/endpoint-service';

export function loadGroup(id) {
  return (dispatch, getState) => {
    const { endpoints } = getState();
    const group = filterByIdAndType([...endpoints], id, 'Group');

    dispatch(setGroupView(group));
  };
}
