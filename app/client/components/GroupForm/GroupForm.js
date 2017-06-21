import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence } from 'redux-form-validators';

import InputGroup from 'components/Form/InputGroup/InputGroup';
import RFTextInput from 'components/Form/RFTextInput/RFTextInput';
import Button from 'components/Button/Button';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

import { validationErrors } from 'services/formService';

const validate = values => (
  validationErrors({
    name: [
      presence(),
    ],
  }, values)
);

const getGroupForm = (props) => {
  // Callbacks
  const { onCancel } = props;
  // Redux-form props
  const { handleSubmit, submitting, valid } = props;

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }
      <InputGroup title="Group name" description="Best practice is to name your group from an API resource">
        <Field
          name="name"
          component={RFTextInput}
          placeholder="e.g. Authentication"
          autofocus
        />
      </InputGroup>

      <ButtonGroup>
        <Button
          type="submit"
          variants={['primary', 'large']}
          disabled={!valid}
        >
          Save
        </Button>
        <Button
          type="button"
          variants={['large', 'lightBorder', 'spaceLeft']}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
};

getGroupForm.propTypes = {
  onCancel: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  valid: React.PropTypes.bool,
};

const GroupForm = reduxForm({
  form: 'groupForm',
  validate,
})(getGroupForm);

export default GroupForm;

