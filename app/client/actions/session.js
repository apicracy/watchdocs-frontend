/**
 * documentView Actions
 */

export const LOGIN_REQUEST = 'loginRequest@session';
export const LOGIN_SUCCESS = 'loginSuccess@session';
export const LOGIN_FAILED = 'loginFailed@session';

export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(userData) {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
}

export function loginFailed(errors) {
  return {
    type: LOGIN_FAILED,
    payload: errors,
  };
}
