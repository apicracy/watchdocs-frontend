import { browserHistory } from 'react-router';
import { SubmissionError } from 'redux-form';

const API_URL = 'http://watchdocs-backend-dev.herokuapp.com';

export const checkIfAuthorised = (response) => {
  if (response.status === 401) {
    browserHistory.push('/login');
    return Promise.reject([]);
  }
  return response;
};

const validationErrors = (errorData) => {
  const errors = errorData.errors[0].detail;
  const paresedErrors = {};

  Object.keys(errors).forEach((key) => {
    const value = errors[key];
    paresedErrors[key] = value.join(', ');
  });
  return paresedErrors;
};

export const checkIfValid = (response) => {
  if (response.status === 400) {
    return response.json().then((errorData) => {
      throw new SubmissionError(validationErrors(errorData));
    });
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
  }).then(response => checkIfAuthorised(response))
    .then(response => checkIfValid(response));
}
