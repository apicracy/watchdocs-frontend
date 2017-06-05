import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence } from 'redux-form-validators';

import RFTextInput from 'components/Form/RFTextInput/RFTextInput';
import Button from 'components/Button/Button';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import InputGroup from 'components/Form/InputGroup/InputGroup';

import { validationErrors } from 'services/formService';

const validate = values => (
  validationErrors({
    name: [presence()],
    base_url: [presence()],
  }, values)
);

let NewProjectForm = (props) => {
  const { handleSubmit, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }
      <InputGroup title="Project name" variants={['smallLabel']}>
        <Field
          name="name"
          component={RFTextInput}
          placeholder="e.g. My Home API"
        />
      </InputGroup>
      <InputGroup title="Base URL" variants={['smallLabel']}>
        <Field
          name="base_url"
          component={RFTextInput}
          placeholder="http://example.com"
          type="url"
        />
      </InputGroup>
      <Button
        type="submit"
        variants={['primary', 'large', 'block']}
      >
        Save
      </Button>
    </form>
  );
};

NewProjectForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
};

export default NewProjectForm = reduxForm({
  form: 'NewProjectForm',
  validate,
})(NewProjectForm);

