import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence } from 'redux-form-validators';

import RFRadiobutton from 'components/Form/RFRadiobutton/RFRadiobutton';
import RFTextInput from 'components/Form/RFTextInput/RFTextInput';
import Button from 'components/Button/Button';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import InputGroup from 'components/Form/InputGroup/InputGroup';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';

import { validationErrors } from 'services/formService';
import { publicLabel, privateLabel } from './UpdateProjectVisibilityForm';

const validate = values => (
  validationErrors({
    name: [presence()],
  }, values)
);

let NewDetailedProjectForm = (props) => {
  const { handleSubmit, submitting, onCancel } = props;

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }
      <InputGroup title="Project name">
        <Field
          name="name"
          component={RFTextInput}
          placeholder="e.g. My Home API"
        />
      </InputGroup>
      <InputGroup title="API Url">
        <Field
          name="base_url"
          component={RFTextInput}
          type="url"
          placeholder="e.g. https://api.example.com"
        />
      </InputGroup>
      <Field
        name="public"
        component={RFRadiobutton}
        options={[
          { value: true, label: publicLabel },
          { value: false, label: privateLabel },
        ]}
      />
      <ButtonGroup>
        <Button type="submit" variants={['primary', 'large']}>Create</Button>
        <Button variants={['large', 'lightBorder', 'spaceLeft']} onClick={onCancel}>Cancel</Button>
      </ButtonGroup>
    </form>
  );
};

NewDetailedProjectForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  submitting: React.PropTypes.bool,
};

export default NewDetailedProjectForm = reduxForm({
  form: 'NewDetailedProjectForm',
  validate,
})(NewDetailedProjectForm);

