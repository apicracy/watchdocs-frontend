import {
  loginRequest,
  loginFailed,
  loginSuccess,
} from 'actions/session';

import http, { httpNoAuth } from 'services/http';

export function checkStatus(response, message) {
  if (response.status !== 200) {
    return Promise.reject([message]);
  }

  return response;
}

export function getCurrentUser() {
  return (dispatch) => {
    dispatch(loginRequest());

    http('/api/v1/users/me')
      .then(response => response.json())
      .then(response => dispatch(loginSuccess(response)))
      .catch((err) => {
        localStorage.removeItem('JWT');
        dispatch(loginFailed(err));
      });
  };
}

export function authenticate({ email, password }) {
  return (dispatch) => {
    dispatch(loginRequest());

    httpNoAuth('/login', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .then(response => checkStatus(response, 'Sorry, no active user found for given username.'))
      .then((response) => {
        const JWT = response.headers.get('authorization');
        localStorage.setItem('JWT', JWT);

        return response;
      })
      .then(response => response.json())
      .then(response => dispatch(loginSuccess(response)))
      .catch((err) => {
        localStorage.removeItem('JWT');
        dispatch(loginFailed(err));
      });
  };
}
