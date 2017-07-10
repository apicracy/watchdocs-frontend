import http from 'services/http';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';

export default function connectWithSlack({ code }) {
  const options = {
    method: 'POST',
    body: JSON.stringify({ code }),
  };
  const redirectUrl = localStorage.getItem('redirectUrl') || '/';

  return http('/auth/slack/connect', options).then(() => {
    toastr.success("We've connected you with a slack");
  }).catch(({ errors }) => {
    /* eslint no-underscore-dangle:0 */
    // _error is preferred way to setup global error for redux-form
    toastr.error(errors._error);
  }).then(() => {
    browserHistory.push(redirectUrl);
  });
}
