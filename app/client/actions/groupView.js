/**
 * endpointView Actions
 */

export const LOAD_GROUP_VIEW = 'load@groupView';

export function loadGroupView(groupData) {
  return {
    type: LOAD_GROUP_VIEW,
    payload: groupData,
  };
}
