/**
 * groups Actions
 */

export const CREATE_PROJECT = 'create@projects';

export function create(project) {
  return {
    type: CREATE_PROJECT,
    payload: project,
  };
}
