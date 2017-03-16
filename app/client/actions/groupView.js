/**
 * endpointView Actions
 */

export const SET_GROUP_VIEW = 'set@groupView';

export function setGroupView(groupData) {
  return {
    type: SET_GROUP_VIEW,
    payload: groupData,
  };
}
