import React from 'react';
import { Link } from 'react-router';

import EmailForm from 'components/UserForm/EmailForm';
import UnauthorizedLayout from 'components/UnauthorizedLayout/UnauthorizedLayout';

import { requestPasswordReset } from 'services/session';

class ForgotPassword extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      requestSentTo: null,
    };
  }

  onPasswordResetRequest = ({ email }) => {
    this.setState({ requestSentTo: email });
    return this.props.dispatch(requestPasswordReset(email));
  }

  reset = (e) => {
    e.preventDefault();
    this.setState({ requestSentTo: null });
  }

  render() {
    const { requestSentTo } = this.state;

    const title = !requestSentTo ?
      'Password reset' :
      'Email has been sent';

    const alreadySentDescription = (
      <div>
        Okay, we sent an email to {requestSentTo} with a link to reset your password.
        If you don&#39;t receive the email within a few minutes, please
        { ' ' }
        <Link to="/password_reset" onClick={this.reset}>try again.</Link>
      </div>
    );

    const description = !requestSentTo ?
      "Enter the email address you used to sign up and we'll send you a link to reset your password." :
      alreadySentDescription;

    return (
      <UnauthorizedLayout title={title} description={description}>
        { !requestSentTo && <EmailForm onSubmit={this.onPasswordResetRequest} buttonLabel="Reset password" />}
      </UnauthorizedLayout>
    );
  }
}

export default ForgotPassword;
