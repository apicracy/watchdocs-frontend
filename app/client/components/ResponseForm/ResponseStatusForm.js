import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence } from 'redux-form-validators';

import RFSelect from 'components/Form/RFSelect/RFSelect';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

import { validationErrors } from 'services/formService';
import { httpCodes } from 'config';

const validate = values => (
  validationErrors({
    status: [presence()],
  }, values)
);


const ResponseStatusForm = (props) => {
  const { handleSubmit, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }
      <Field
        component={RFSelect}
        name="http_status_code"
        options={httpCodes}
        onChange={() => {
          setTimeout(handleSubmit, 0); // Wait to get updated value
        }}
      />
    </form>
  );
};

ResponseStatusForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
};

export default reduxForm({
  form: 'responseStatusForm',
  validate,
})(ResponseStatusForm);

