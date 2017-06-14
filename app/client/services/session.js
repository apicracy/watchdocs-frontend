import {
  loginRequest,
  loginFailed,
  loginSuccess,
  logout as logoutAction,
} from 'actions/session';

import http, { httpNoAuth } from 'services/http';

import { browserHistory } from 'react-router';

import { SubmissionError } from 'redux-form';

export function checkStatus(response, message) {
  if (response.status !== 200) {
    throw new SubmissionError({ email: message });
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

export function requestPasswordReset(email) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ email }),
    };

    return http('/api/v1/users/reset_password_token', options);
}

export function authenticate({ email, password }) {
  return (dispatch) => {
    dispatch(loginRequest());

    return httpNoAuth('/login', {
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
      .then(response => dispatch(loginSuccess(response)));
  };
}

export function logout() {
  return (dispatch) => {
    httpNoAuth('/logout', {
      method: 'DELETE',
    }).then(() => {
      localStorage.removeItem('JWT');
      dispatch(logoutAction());
      browserHistory.push('/login');
    });
  };
}
