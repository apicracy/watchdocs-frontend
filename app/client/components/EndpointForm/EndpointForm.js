import React from 'react';
import styles from './EndpointForm.css';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import RFTextInput from 'components/Form/RFTextInput/RFTextInput';
import Select from 'components/Form/Select/Select';

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

let EndpointForm = ({ endpointType, onChangeInput,
  onChangeEndpointType }) => (
    <div>
      <div className={styles.modalField}>
        <text className={styles.modalLabel}>Endpoint URL</text>
        <text className={styles.modalSmallLabel}>
          Format endpoint url to &quot;id&quot; notation (for example /user/:id)
        </text>
        <div className={styles.modalInputWrapper}>
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
          />
        </div>
      </div>
    </div>
);

EndpointForm.propTypes = {
  endpointType: React.PropTypes.string,
  onChangeInput: React.PropTypes.func,
  onChangeEndpointType: React.PropTypes.func,
};

EndpointForm.defaultProps = {
  endpointType: 'GET',
};

EndpointForm = reduxForm({
  form: 'endpointForm',
  validate,
})(EndpointForm);

EndpointForm = connect(state => ({
  initialValues: {
    url: state.modifyEndpoint.url,
  },
}))(EndpointForm);

export default EndpointForm;
