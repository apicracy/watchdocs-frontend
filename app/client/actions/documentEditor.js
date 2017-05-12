/**
 * documentEditor Actions
 */

export const SET_NAME = 'setName@documentEditor';
export const SET_DESCRIPTION = 'setDescription@documentEditor';
export const RESET = 'reset@documentEditor';

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
