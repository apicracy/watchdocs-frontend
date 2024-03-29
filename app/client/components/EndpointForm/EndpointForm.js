import React from 'react';
import styles from './EndpointForm.css';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import RFTextInput from 'components/Form/RFTextInput/RFTextInput';
import Select from 'components/Form/Select/Select';
import Button from 'components/Button/Button';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';


const httpMethods = [
  { id: 'GET', name: 'GET' },
  { id: 'POST', name: 'POST' },
  { id: 'PUT', name: 'PUT' },
  { id: 'PATCH', name: 'PATCH' },
  { id: 'DELETE', name: 'DELETE' },
];

const validUrl = new RegExp(/^\/?(:?[A-Za-z0-9\-_.~]+\/)*(:?[A-Za-z0-9\-_.~]+\/?)$/i);

const validate = (values) => {
  const errors = {};
  if (!validUrl.test(values.url)) {
    errors.url = 'Endpoint URL should include only allowed URL characters.';
  }
  return errors;
};

let EndpointFormComponent = ({ endpointType, onChangeInput, handleSubmit,
  onChangeEndpointType, onCancel, saveButtonText, cancelButtonText, valid,
  submitting }) => (
    <form onSubmit={handleSubmit} >
      { submitting && <LoadingIndicator fixed /> }
      <div className={styles.modalField}>
        <text className={styles.modalLabel}>Endpoint URL</text>
        <text className={styles.modalSmallLabel}>
          Format endpoint url to &quot;id&quot; notation (for example /user/:id)
        </text>
        <div className={styles.modalInputWrapper}>
          { /* TODO: Convert Select to redux-form Field */ }
          <Select
            variants={['inline', 'bordered']}
            options={httpMethods}
            activeId={endpointType}
            onSelect={id => (onChangeEndpointType(id))}
          />
          <Field
            name="url"
            component={RFTextInput}
            variants={['modal']}
            placeholder="URL endpoint"
            onChange={e => (onChangeInput(e.target.value))}
            autofocus
          />
        </div>
      </div>
      <ButtonGroup>
        <Button type="submit" variants={['primary', 'large']} disabled={!valid}>{saveButtonText}</Button>
        <Button variants={['large', 'lightBorder', 'spaceLeft']} onClick={onCancel}>{cancelButtonText}</Button>
      </ButtonGroup>
    </form>
);

EndpointFormComponent.propTypes = {
  endpointType: React.PropTypes.string,
  onChangeInput: React.PropTypes.func,
  onChangeEndpointType: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  saveButtonText: React.PropTypes.string,
  cancelButtonText: React.PropTypes.string,
  valid: React.PropTypes.bool,
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
};

EndpointFormComponent.defaultProps = {
  endpointType: 'GET',
  saveButtonText: 'Save',
  cancelButtonText: 'Cancel',
};

EndpointFormComponent = reduxForm({
  form: 'endpointForm',
  validate,
})(EndpointFormComponent);

const EndpointForm = connect(state => ({
  initialValues: {
    url: state.modifyEndpoint.url,
  },
}))(EndpointFormComponent);

export default EndpointForm;
