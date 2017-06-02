import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence } from 'redux-form-validators';

import RFTextInput from 'components/Form/RFTextInput/RFTextInput';
import Button from 'components/Button/Button';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

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
      <Field
        name="name"
        component={RFTextInput}
        placeholder="Project name"
        autofocus
      />
      <Field
        name="base_url"
        component={RFTextInput}
        placeholder="http://example.com"
        type="url"
      />
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

