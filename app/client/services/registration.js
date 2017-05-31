import http from 'services/http';

import {
  registrationSuccess,
} from 'actions/registration';

import {
  authenticate,
} from 'services/session';

export function registerUser(userParams) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ user: userParams }),
    };

    return http('/signup', options)
      .then(response => response.json())
      .then((data) => {
        dispatch(registrationSuccess(data));
        dispatch(authenticate(userParams));
      });
  };
}
