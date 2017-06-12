import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence, email, confirmation } from 'redux-form-validators';

import Button from 'components/Button/Button';
import RFTextInput from 'components/Form/RFTextInput/RFTextInput';
import InputGroup from 'components/Form/InputGroup/InputGroup';

import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

import { validationErrors } from 'services/formService';

const validate = values => (
  validationErrors({
    username: [presence(), email()],
    password: [presence()],
    password_confirmation: [presence(), confirmation({ field: 'password' })],
  }, values)
);


const SignupForm = (props) => {
  const { handleSubmit, submitting, buttonLabel } = props;

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }
      <InputGroup title="Email">
        <Field
          component={RFTextInput}
          name="email"
        />
      </InputGroup>
      <InputGroup title="Password">
        <Field
          type="password"
          component={RFTextInput}
          name="password"
        />
      </InputGroup>
      <InputGroup title="Password confirmation">
        <Field
          type="password"
          component={RFTextInput}
          name="password_confirmation"
        />
      </InputGroup>

      <Button type="submit" variants={['primary', 'extra-large', 'block']}>
        {buttonLabel}
      </Button>
    </form>
  );
};

SignupForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  buttonLabel: React.PropTypes.string,
};

export default reduxForm({
  form: 'SignupForm',
  validate,
})(SignupForm);

