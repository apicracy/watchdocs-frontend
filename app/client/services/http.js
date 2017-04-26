import { browserHistory } from 'react-router';

const API_URL = 'http://watchdocs-backend-dev.herokuapp.com';

export const checkIfAuthorised = (response) => {
  if (response.status === 401) {
    browserHistory.push('/login');
    return Promise.reject([]);
  }

  return response;
};

export const httpNoAuth = (url, options = {}) => (
  fetch(`${API_URL}${url}`, {
    method: 'GET',
    ...options,
  })
);


export default function http(url, options = {}) {
  const JWT = localStorage.getItem('JWT');

  return fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers: {
      authorization: JWT,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
  }).then(response => checkIfAuthorised(response));
}
