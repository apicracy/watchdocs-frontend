import React from 'react';
import { connect } from 'react-redux';

import ResetPasswordForm from 'components/UserForm/ResetPasswordForm';
import UnauthorizedLayout from 'components/UnauthorizedLayout/UnauthorizedLayout';

import { resetPassword } from 'services/session';

@connect(() => ({}))
class ResetPassword extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    location: React.PropTypes.object, // supplied by react-router
  }

  onPasswordReset = (values) => {
    const token = this.props.location.query.token;
    return this.props.dispatch(resetPassword(token, values));
  }

  render() {
    const title = 'Password reset';
    const description = 'Please enter your new password';

    return (
      <UnauthorizedLayout title={title} description={description}>
        <ResetPasswordForm onSubmit={this.onPasswordReset} buttonLabel="Reset password" />
      </UnauthorizedLayout>
    );
  }
}

export default ResetPassword;
