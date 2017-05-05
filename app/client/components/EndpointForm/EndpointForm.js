import React from 'react';
import styles from './EndpointForm.css';
import { Field, reduxForm } from 'redux-form';

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

class EndpointForm extends React.Component {
  static propTypes = {
    inputValue: React.PropTypes.string,
    endpointType: React.PropTypes.string,

    onChangeInput: React.PropTypes.func,
    onChangeEndpointType: React.PropTypes.func,
  };

  static defaultProps = {
    endpointType: 'GET',
  }

  render() {
    const {
      inputValue,
      endpointType,
    } = this.props;

    return (
      <div>
        <div className={styles.modalField}>
          <text className={styles.modalLabel}>Endpoint URL</text>
          <text className={styles.modalSmallLabel}>
            Dupa &quot;id&quot; notation (for example /user/:id)
          </text>
          <div className={styles.modalInputWrapper}>
            <Select
              variants={['inline', 'bordered']}
              options={httpMethods}
              activeId={endpointType}
              onSelect={this.onChangeEndpointType}
            />
            <Field
              name="url"
              component={RFTextInput}
              variants={['modal']}
              value={inputValue}
              placeholder="URL endpoint"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
      </div>
    );
  }

  onChangeEndpointType = (id) => {
    this.props.onChangeEndpointType(id);
  }

  onChangeInput = (e) => {
    this.props.onChangeInput(e.target.value);
  }
}

export default reduxForm({
  form: 'endpointForm',
  validate,
})(EndpointForm);
