/**
 * endpointView Actions
 */

export const FETCH_DOCUMENTATION = 'fetch@documentation';

export function fetchDocumentation(documentation) {
  return {
    type: FETCH_DOCUMENTATION,
    payload: documentation,
  };
}
