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
  }, values)
);

let UpdateProjectNameForm = (props) => {
  const { handleSubmit, submitting, reset, dirty } = props;

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }
      <Field
        name="name"
        component={RFTextInput}
        placeholder="e.g. My Home API"
      />
      { dirty && (
        <div>
          <Button type="submit" variants={['primary']}>
            Save
          </Button>
          <Button type="button" variants={['body', 'spaceLeft']} onClick={reset}>
            Cancel
          </Button>
        </div>
      )}
    </form>
  );
};

UpdateProjectNameForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  reset: React.PropTypes.func,
  dirty: React.PropTypes.bool,
};

export default UpdateProjectNameForm = reduxForm({
  form: 'UpdateProjectNameForm',
  validate,
})(UpdateProjectNameForm);

