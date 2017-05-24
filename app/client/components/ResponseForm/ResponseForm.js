import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence } from 'redux-form-validators';

import InputGroup from 'components/Form/InputGroup/InputGroup';
import RFSelect from 'components/Form/RFSelect/RFSelect';
import Button from 'components/Button/Button';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

import { validationErrors } from 'services/formService';
import { httpCodes } from 'config';

const validate = values => (
  validationErrors({
    status: [presence()],
  }, values)
);

const ResponseForm = (props) => {
  // Callbacks
  const { onCancel } = props;
  // Redux-form props
  const { handleSubmit, submitting, valid } = props;

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }
      <InputGroup title="Status code" description="This represents HTTP status code of a response.">
        <Field
          component={RFSelect}
          name="http_status_code"
          options={httpCodes}
        />
      </InputGroup>
      <ButtonGroup>
        <Button type="submit" variants={['primary', 'large']} disabled={!valid}>
          Save
        </Button>
        <Button type="button" variants={['large', 'lightBorder', 'spaceLeft']} onClick={onCancel}>
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
};

ResponseForm.propTypes = {
  onCancel: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  valid: React.PropTypes.bool,
};

export default reduxForm({
  form: 'responseForm',
  validate,
})(ResponseForm);

