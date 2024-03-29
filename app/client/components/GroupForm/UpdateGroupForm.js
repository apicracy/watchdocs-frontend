import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence } from 'redux-form-validators';

import RFTextInput from 'components/Form/RFTextInput/RFTextInput';
import RFRichTextArea from 'components/Form/RFRichTextArea/RFRichTextArea';
import Button from 'components/Button/Button';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';

import { validationErrors } from 'services/formService';

const validate = values => (
  validationErrors({
    name: [presence()],
  }, values)
);

let UpdateGroupForm = (props) => {
  const { handleSubmit, submitting, reset } = props;

  const handleReset = (event) => {
    event.preventDefault();
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }
      <DocumentationBlock
        title="Group title"
        description="This is title of the section we're going
          to display in documentation and in navigation."
      >
        <Field
          name="name"
          component={RFTextInput}
          placeholder="e.g. Authorization"
        />
      </DocumentationBlock>

      <DocumentationBlock
        title="Additional description"
        description="This description will
          appear on your generated public documentation."
      >
        <Field
          name="description"
          component={RFRichTextArea}
          placeholder="test"
          id="group-description-editor"
        />
      </DocumentationBlock>

      <Button
        variants={['primary', 'large', 'spaceRight']}
        type="submit"
      >Save</Button>
      <Button
        variants={['body', 'large']}
        onClick={handleReset}
      >
        Cancel
      </Button>
    </form>
  );
};

UpdateGroupForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  reset: React.PropTypes.func,
  submitting: React.PropTypes.bool,
};

export default UpdateGroupForm = reduxForm({
  form: 'UpdateGroupForm',
  validate,
})(UpdateGroupForm);

