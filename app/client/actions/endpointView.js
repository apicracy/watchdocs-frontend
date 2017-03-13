/**
 * endpointView Actions
 */

export const LOAD_ENDPOINT_VIEW = 'load@endpointView';

export function loadEndpointView(endpointData) {
  return {
    type: LOAD_ENDPOINT_VIEW,
    payload: endpointData,
  };
}
