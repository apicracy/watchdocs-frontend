import React from 'react';
import { connect } from 'react-redux';

import ResetPasswordForm from 'components/UserForm/ResetPasswordForm';
import UnauthorizedLayout from 'components/UnauthorizedLayout/UnauthorizedLayout';

import { requestPasswordReset } from 'services/session';

@connect(store => ({}))
class ForgotPassword extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
  }

  onPasswordResetRequest = ({ email }) => (
    this.props.dispatch(requestPasswordReset(email))
  )

  render() {
    const title = 'Password reset';
    const description = "Enter the email address you used to sign up and we'll send you a link to reset your password.";

    return (
      <UnauthorizedLayout title={title} description={description}>
        <ResetPasswordForm onSubmit={this.onPasswordResetRequest} buttonLabel="Reset password" />
      </UnauthorizedLayout>
    );
  }
}

export default ForgotPassword;
