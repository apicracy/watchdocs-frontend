/**
 * endpointView Actions
 */

export const SET_ENDPOINT_VIEW = 'set@endpointView';

export function setEndpointView(endpointData) {
  return {
    type: SET_ENDPOINT_VIEW,
    payload: endpointData,
  };
}
