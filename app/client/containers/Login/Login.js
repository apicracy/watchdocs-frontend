import React from 'react';
import { connect } from 'react-redux';

import LoginForm from 'components/UserForm/LoginForm';
import UnauthorizedLayout from 'components/UnauthorizedLayout/UnauthorizedLayout';

import { authenticate } from 'services/session';

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

  onLogin = (userParams => (
    this.props.dispatch(authenticate(userParams))
  ))

  render() {
    return (
      <UnauthorizedLayout>
        <LoginForm onSubmit={this.onLogin} buttonLabel="Login" />
      </UnauthorizedLayout>
    );
  }
}

export default Login;
