import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence } from 'redux-form-validators';

import RFTextInput from 'components/Form/RFTextInput/RFTextInput';
import Button from 'components/Button/Button';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import InputGroup from 'components/Form/InputGroup/InputGroup';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';

import { validationErrors } from 'services/formService';

const validate = values => (
  validationErrors({
    name: [presence()],
  }, values)
);

let UpdateProjectForm = (props) => {
  const { handleSubmit, submitting, onCancel, valid } = props;

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }
      <InputGroup title="Application name">
        <Field
          name="name"
          component={RFTextInput}
          placeholder="e.g. My Home API"
        />
      </InputGroup>
      <InputGroup title="Base URL" description="This is a prefix for all your endpoint paths.">
        <Field
          name="base_url"
          component={RFTextInput}
          placeholder="http://example.com"
          type="url"
        />
      </InputGroup>
      <ButtonGroup>
        <Button type="submit" variants={['primary', 'large']} disabled={!valid}>Update</Button>
        <Button variants={['large', 'lightBorder', 'spaceLeft']} onClick={onCancel}>Cancel</Button>
      </ButtonGroup>
    </form>
  );
};

UpdateProjectForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  onCancel: React.PropTypes.func,
  valid: React.PropTypes.bool,
};

export default UpdateProjectForm = reduxForm({
  form: 'UpdateProjectForm',
  validate,
})(UpdateProjectForm);

