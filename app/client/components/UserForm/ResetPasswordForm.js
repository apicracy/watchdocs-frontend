import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence, confirmation } from 'redux-form-validators';

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
  const { handleSubmit, submitting, buttonLabel, submitSucceeded } = props;

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }

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

      <Button type="submit" variants={['primary', 'extra-large', 'block']} disabled={submitSucceeded}>
        {buttonLabel}
      </Button>
    </form>
  );
};

ResetPasswordForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  buttonLabel: React.PropTypes.string,
  submitSucceeded: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
};

export default reduxForm({
  form: 'ResetPasswordForm',
  validate,
})(ResetPasswordForm);

