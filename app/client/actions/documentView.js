/**
 * documentView Actions
 */

export const SET_NAME = 'setName@documentView';
export const SET_DESCRIPTION = 'setDescription@documentView';
export const RESET = 'reset@documentView';

export function setName(value) {
  return {
    type: SET_NAME,
    payload: value,
  };
}

export function setDescription(value) {
  return {
    type: SET_DESCRIPTION,
    payload: value,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}
