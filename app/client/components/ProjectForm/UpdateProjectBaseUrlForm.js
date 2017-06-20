import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence } from 'redux-form-validators';

import RFTextInput from 'components/Form/RFTextInput/RFTextInput';
import Button from 'components/Button/Button';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

import { validationErrors } from 'services/formService';

const validate = values => (
  validationErrors({
    base_url: [presence()],
  }, values)
);

let UpdateProjectBaseUrlForm = (props) => {
  const { handleSubmit, submitting, reset, dirty } = props;

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }
      <Field
        name="base_url"
        component={RFTextInput}
        placeholder="http://example.com"
        type="url"
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

UpdateProjectBaseUrlForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  reset: React.PropTypes.func,
  dirty: React.PropTypes.bool,
};

export default UpdateProjectBaseUrlForm = reduxForm({
  form: 'UpdateProjectBaseUrlForm',
  validate,
})(UpdateProjectBaseUrlForm);

