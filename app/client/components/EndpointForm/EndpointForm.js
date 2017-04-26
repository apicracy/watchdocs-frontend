import React from 'react';
import styles from './EndpointForm.css';

import TextInput from 'components/Form/TextInput/TextInput';

class EndpointForm extends React.Component {
  static propTypes = {
    inputValue: React.PropTypes.string,
    endpointType: React.PropTypes.string,

    onChangeInput: React.PropTypes.func,
    onChangeEndpointType: React.PropTypes.func,
  };

  static defaultProps = {
    selectedParentFolder: '',
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
            Format query params to &quot;id&quot; notation (for example /user/:id)
          </text>
          <div className={styles.modalInputWrapper}>
            <select
              value={endpointType}
              className={styles.modalEndpointSelect}
              onChange={this.onChangeEndpointType}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </select>
            <TextInput
              variants={['noRadius', 'big', 'darkBorder']}
              value={inputValue}
              placeholder="URL endpoint"
              onChange={this.onChangeInput}
              validation={new RegExp(/((^[a-zA-Z_$][a-zA-Z_$[\]0-9]*$))/ig)}
              validationErrorMsg={'Endpoint URL should include only allowed URL characters.'}
            />
          </div>
        </div>
      </div>
    );
  }

  onChangeEndpointType = (e) => {
    this.props.onChangeEndpointType(e.target.value);
  }

  onChangeInput = (e) => {
    this.props.onChangeInput(e.target.value);
  }
}

export default EndpointForm;
