import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { presence, format } from 'redux-form-validators';

import InputGroup from 'components/Form/InputGroup/InputGroup';
import RFTextInput from 'components/Form/RFTextInput/RFTextInput';
import TextArea from 'components/Form/TextArea/TextArea';
import CheckBox from 'components/Form/CheckBox/CheckBox';
import RFSelect from 'components/Form/RFSelect/RFSelect';
import Button from 'components/Button/Button';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

import { validationErrors } from 'services/formService';

const validate = values => (
  validationErrors({
    name: [
      presence(),
      format({
        with: /((^[a-zA-Z_$][a-zA-Z_$[\]0-9]*$))/i,
        message: 'Only URL param valid characters are allowed.',
      }),
    ],
    data_type: [presence()],
  }, values)
);

const ParamForm = (props) => {
  // Form filds
  const { required, paramTypes } = props;
  // Callbacks
  const { onFieldChange, onRequiredChange, onTypeChange, onCancel } = props;
  // Redux-form props
  const { handleSubmit, submitting, valid } = props;

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator fixed /> }
      <InputGroup title="Name" description="Write here param name as it apears inside URL">
        <Field
          name="name"
          component={RFTextInput}
          placeholder="Param name"
          onChange={onFieldChange('name')}
          autofocus
        />
        <CheckBox
          activeIds={[required ? 1 : null]}
          options={[
            { id: 1, text: 'Param required' },
          ]}
          onChange={onRequiredChange}
        />
      </InputGroup>

      <InputGroup title="Type" description="Give user more information about data type of param">
        <Field
          component={RFSelect}
          name="data_type"
          options={paramTypes}
          onChange={onTypeChange}
        />
      </InputGroup>

      <InputGroup title="Description" description="Give user more context info about the param itself">
        <Field
          name="description"
          component={TextArea}
          placeholder="Param description"
          onChange={onFieldChange('description')}
          rows={3}
        />
      </InputGroup>

      <InputGroup title="Example" description="This examle is going to be used to generate user friendly documentation">
        <Field
          name="example"
          component={RFTextInput}
          placeholder="Example of param value"
          onChange={onFieldChange('example')}
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

ParamForm.propTypes = {
  required: React.PropTypes.bool,
  paramTypes: React.PropTypes.array,
  onFieldChange: React.PropTypes.array.func,
  onRequiredChange: React.PropTypes.func,
  onTypeChange: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  valid: React.PropTypes.bool,
};

const UrlParamForm = reduxForm({
  form: 'urlParamForm',
  validate,
})(ParamForm);

export default UrlParamForm;

