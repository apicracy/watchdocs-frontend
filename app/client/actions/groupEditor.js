/**
 * groupEditor Actions
 */

export const SET_GROUP_VIEW = 'set@groupEditor';

export function setGroupEditor(groupData) {
  return {
    type: SET_GROUP_VIEW,
    payload: groupData,
  };
}
