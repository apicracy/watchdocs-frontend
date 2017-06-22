/**
 * groupEditor Actions
 */

export const SET_GROUP_VIEW = 'set@groupEditor';
export const SET_FETCHING_FLAG = 'setFetchingFlag@groupEditor';

export function setGroupEditor(groupData) {
  return {
    type: SET_GROUP_VIEW,
    payload: groupData,
  };
}

export function setFetchingFlag(newFlag) {
  return {
    type: SET_FETCHING_FLAG,
    payload: newFlag,
  };
}
