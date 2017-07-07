import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence, email } from 'redux-form-validators';

import styles from './UserForm.css';
import Button from 'components/Button/Button';
import RFTextInput from 'components/Form/RFTextInput/RFTextInput';
import InputGroup from 'components/Form/InputGroup/InputGroup';

import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

import { validationErrors } from 'services/formService';

const validate = values => (
  validationErrors({
    email: [presence(), email()],
  }, values)
);


const ForgotPasswordForm = (props) => {
  const { handleSubmit, submitting, buttonLabel, submitSucceeded, reset } = props;

  /* eslint-disable */
  const successMessage = (
    <div className={styles.submittedInfo}>
      Okay, we sent an email with a link to reset your password.
      If you don&#39;t receive the email within a few minutes, please
      { ' ' }
      <a onClick={reset} >try again.</a>
    </div>
  );
  /* eslint-enable */

  const emailForm = (
    <div>
      <InputGroup title="Email">
        <Field
          component={RFTextInput}
          name="email"
        />
      </InputGroup>

      <Button type="submit" variants={['primary', 'extra-large', 'block']} disabled={submitSucceeded}>
        {buttonLabel}
      </Button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }
      { submitSucceeded ? successMessage : emailForm }
    </form>
  );
};

ForgotPasswordForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  buttonLabel: React.PropTypes.string,
  submitSucceeded: React.PropTypes.bool,
  reset: React.PropTypes.func,
};

export default reduxForm({
  form: 'ForgotPasswordForm',
  validate,
})(ForgotPasswordForm);
