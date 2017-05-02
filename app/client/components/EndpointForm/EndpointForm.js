import React from 'react';
import styles from './EndpointForm.css';

import TextInput from 'components/Form/TextInput/TextInput';
import Select from 'components/Form/Select/Select';

const httpMethods = [
  { id: 'GET', name: 'GET' },
  { id: 'POST', name: 'POST' },
  { id: 'PUT', name: 'PUT' },
  { id: 'PATCH', name: 'PATCH' },
  { id: 'DELETE', name: 'DELETE' },
];

class EndpointForm extends React.Component {
  static propTypes = {
    inputValue: React.PropTypes.string,
    endpointType: React.PropTypes.string,

    onChangeInput: React.PropTypes.func,
    onChangeEndpointType: React.PropTypes.func,
    validUrl: React.PropTypes.object,
  };

  static defaultProps = {
    endpointType: 'GET',
  }

  render() {
    const {
      inputValue,
      endpointType,
      validUrl,
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
            <TextInput
              variants={['modal']}
              value={inputValue}
              placeholder="URL endpoint"
              onChange={this.onChangeInput}
              validation={validUrl}
              validationErrorMsg={'Endpoint URL should include only allowed URL characters.'}
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

export default EndpointForm;
