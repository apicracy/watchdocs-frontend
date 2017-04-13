import React from 'react';
import { connect } from 'react-redux';
import styles from './Login.css';
import logo from '../../assets/watchdocslogo_white_full.png';

import Button from 'components/Button/Button';
import InputGroup from 'components/Form/InputGroup/InputGroup';
import TextInput from 'components/Form/TextInput/TextInput';

import { authenticate } from 'services/session';

@connect(store => ({
  session: store.session,
}))
class Login extends React.Component {

  static propTypes = {
    session: React.PropTypes.object,
    router: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  componentWillMount() {
    this.setState({
      email: '',
      password: '',
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.session.isAuthenticated) {
      this.props.router.push('/');
    }
  }

  onFieldChange = fieldName => ({ nativeEvent }) => (
    this.setState({ [fieldName]: nativeEvent.target.value })
  );

  onSave = () => this.props.dispatch(authenticate(this.state));

  render() {
    const { loginErrors } = this.props.session;

    return (
      <div className={styles.root}>
        {
          loginErrors && loginErrors.length > 0 && (
            <div className={styles.errors}> {loginErrors[0]} </div>
          )
        }
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src={logo} alt="Watchdocs.io" />
          </div>
          <div className={styles.form}>
            <InputGroup description="Email">
              <TextInput
                value={this.state.email}
                onChange={this.onFieldChange('email')}
              />
            </InputGroup>
            <InputGroup description="Password">
              <TextInput
                type="password"
                value={this.state.password}
                onChange={this.onFieldChange('password')}
              />
            </InputGroup>
            <Button variants={['primary', 'large', 'block']} onClick={this.onSave}>Login</Button>
          </div>
          <div className={styles.forgottenPassword}>
            <a href="/login">New user?</a>
            <a href="/login">Forgotten password?</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
