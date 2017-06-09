import React from 'react';
import { connect } from 'react-redux';

import SignupForm from 'components/UserForm/SignupForm';
import UnauthorizedLayout from 'components/UnauthorizedLayout/UnauthorizedLayout';

import { registerUser } from 'services/registration';

@connect(store => ({
  session: store.session,
}))

class Signup extends React.Component {
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

  onSignup = (values => (
    this.props.dispatch(registerUser(values))
  ))

  render() {
    return (
      <UnauthorizedLayout title={'Create an account'} description={'Watchdocs is a tool that plugs into your application to generate documentation and keep it always up to date.'}>
        <SignupForm onSubmit={this.onSignup} buttonLabel="Signup" />
      </UnauthorizedLayout>
    );
  }
}

export default Signup;
