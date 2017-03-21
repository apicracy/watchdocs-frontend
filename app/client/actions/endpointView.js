/**
 * endpointView Actions
 */

export const SET_ENDPOINT_VIEW = 'set@endpointView';
export const ADD_ENDPOINT_PARAM = 'addParam@endpointView';

export function setEndpointView(endpointData) {
  return {
    type: SET_ENDPOINT_VIEW,
    payload: endpointData,
  };
}

export function addEndpointParam(paramData) {
  return {
    type: ADD_ENDPOINT_PARAM,
    payload: paramData,
  };
}
