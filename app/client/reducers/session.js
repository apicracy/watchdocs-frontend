import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from 'actions/session';

const INITIAL_STATE = {
  isFetching: false,
  isAuthenticated: false,
  user: null,
  loginErrors: [],
};

export function session(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST: return loginRequest(state);
    case LOGIN_SUCCESS: return loginSuccess(state, payload);
    case LOGIN_FAILED: return loginFailed(payload);
    default: return state;
  }
}

function loginRequest(state) {
  return { ...state, isFetching: true, loginErrors: [] };
}

function loginSuccess(state, user) {
  return { ...state, isFetching: false, isAuthenticated: true, user };
}

function loginFailed(errors) {
  return { ...INITIAL_STATE, loginErrors: errors };
}
