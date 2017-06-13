import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import EmailForm from 'components/UserForm/EmailForm';
import UnauthorizedLayout from 'components/UnauthorizedLayout/UnauthorizedLayout';

import { requestPasswordReset } from 'services/session';

@connect(store => ({
  session: store.session,
}))

class Login extends React.Component {
  static propTypes = {
    session: React.PropTypes.object,
    router: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    location: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      requestSentTo: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { session, location } = nextProps;
    const { redirect } = location.query;

    if (session.isAuthenticated) {
      if (redirect) {
        this.props.router.push(redirect);
      } else {
        this.props.router.push('/');
      }
    }
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

export default Login;
