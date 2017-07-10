import http from 'services/http';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';

export default function connectWithSlack({ code }) {
  const options = {
    method: 'POST',
    body: JSON.stringify({ code }),
  };

  return http('/auth/slack/connect', options).then(() => {
    browserHistory.push('/').then(() => {
      toastr.success('We have connected your app with Slack');
    });
  }).catch((error) => {
    browserHistory.push('/').then(() => {
      toastr.success('We have connected your app with Slack');
    });
    // toastr.error(error);
  });
}
