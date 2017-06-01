/**
 * endpointView Actions
 */

export const OPEN_MODAL = 'open@modals';
export const CLOSE_MODAL = 'close@modals';

export function openModal(id, refId = null) {
  return {
    type: OPEN_MODAL,
    payload: { id, refId },
  };
}

export function closeModal(id) {
  return {
    type: CLOSE_MODAL,
    payload: id,
  };
}
