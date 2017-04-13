import {
  loginRequest,
  loginFailed,
  loginSuccess,
} from 'actions/session';

export function authenticate({ email, password }) {
  return (dispatch) => {
    dispatch(loginRequest());

    fetch('http://watchdocs-backend-dev.herokuapp.com/login', {
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
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(['Sorry, no active user found for given username']);
        }

        const JWT = response.headers.get('authorization');
        sessionStorage.setItem('JWT', JWT);

        return response;
      })
      .then(response => response.json())
      .then(response => dispatch(loginSuccess(response)))
      .catch((err) => {
        sessionStorage.removeItem('JWT');
        dispatch(loginFailed(err));
      });
  };
}
