import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence, confirmation } from 'redux-form-validators';
import { Link } from 'react-router';

import styles from './UserForm.css';
import Button from 'components/Button/Button';
import RFTextInput from 'components/Form/RFTextInput/RFTextInput';
import InputGroup from 'components/Form/InputGroup/InputGroup';

import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

import { validationErrors } from 'services/formService';

const validate = values => (
  validationErrors({
    password: [presence()],
    password_confirmation: [presence(), confirmation({ field: 'password' })],
  }, values)
);


const ResetPasswordForm = (props) => {
  const { handleSubmit, submitting, buttonLabel, submitSucceeded, error } = props;

  const successMessage = (
    <div className={styles.submittedInfo}>
      Per your request, we have successfully changed your password.
      You can now proceed to <Link to="/login">Login page</Link>
    </div>
  );

  const failureMessage = (
    <div className={styles.submittedError}>
      { error }
      { ' ' }
      <Link to="/forgot_password">Please try again</Link>
    </div>
  );

  const passwordForm = (
    <div>
      <InputGroup title="New password">
        <Field
          type="password"
          component={RFTextInput}
          name="password"
        />
      </InputGroup>
      <InputGroup title="New password confirmation">
        <Field
          type="password"
          component={RFTextInput}
          name="password_confirmation"
        />
      </InputGroup>

      <Button type="submit" variants={['primary', 'extra-large', 'block']}>
        {buttonLabel}
      </Button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }
      { error ? failureMessage : '' }
      { submitSucceeded ? successMessage : passwordForm }
    </form>
  );
};

ResetPasswordForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  buttonLabel: React.PropTypes.string,
  submitSucceeded: React.PropTypes.bool,
  error: React.PropTypes.any,
};

export default reduxForm({
  form: 'ResetPasswordForm',
  validate,
})(ResetPasswordForm);

