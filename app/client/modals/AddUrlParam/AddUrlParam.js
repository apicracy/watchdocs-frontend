import React from 'react';
import { connect } from 'react-redux';
import styles from './AddNewModal.css';
import Modal from 'components/Modal/Modal';
import InputGroup from 'components/InputGroup/InputGroup';
import TextInput from 'components/TextInput/TextInput';
import TextArea from 'components/TextArea/TextArea';
import CheckBox from 'components/CheckBox/CheckBox';

import { closeModal } from 'actions/modals';
import { addEndpointParam } from 'actions/endpointView';

export const MODAL_NAME = 'addUrlParam';

const warningMessage = {
  type: 'warning',
  title: 'Doc Missing!',
  content: 'We have found that you miss description in your documentation. Please fill it in to make it easily accessible by end users.',
};

@connect(store => ({
  isVisible: !!store.modals[MODAL_NAME],
  endpoint: store.endpointView,
}))
class AddUrlParam extends React.Component {

  componentWillMount() {
    this.reset();
  }

  reset = () => this.setState({
    name: '',
    isRequired: false,
    description: '',
    example: '',
  });

  onSave = () => {
    this.props.dispatch(addEndpointParam({ ...this.state }));
    this.props.dispatch(closeModal(MODAL_NAME));
    this.reset();
  }

  onHide = () => {
    this.props.dispatch(closeModal(MODAL_NAME));
    this.reset();
  }

  onFieldChange = fieldName => ({ nativeEvent }) => {
    this.setState({ [fieldName]: nativeEvent.target.value });
  }

  onRequiredChange = () => {
    this.setState({ isRequired: !this.state.isRequired });
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        title="URL param"
        onSave={this.onSave}
        onHide={this.onHide}
        saveButtonText="Save"
        cancelButtonText="Preview"
        message={warningMessage}
      >

        <InputGroup title="Name" description="Write here param name as it apears inside URL">
          <TextInput
            value={this.state.name}
            placeholder="Param name"
            onChange={this.onFieldChange('name')}
            validation={new RegExp(/([0-9A-Za-z])/ig)}
            validationErrorMsg={'URL parameter should include only allowed URL characters.'}
          />

          <CheckBox
            activeIds={[this.state.isRequired ? 1 : null]}
            options={[
              { id: 1, text: 'Param required' },
            ]}
            onChange={this.onRequiredChange}
          />
        </InputGroup>

        <InputGroup title="Description" description="Give user more context info about the param itself">
          <TextArea
            rows={4}
            value={this.state.description}
            placeholder="Example of param value"
            onChange={this.onFieldChange('description')}
          />
        </InputGroup>

        <InputGroup title="Example" description="This examle is going to be used to generate user friendly documentation">
          <TextInput
            value={this.state.example}
            placeholder="Example of param value"
            onChange={this.onFieldChange('example')}
          />
        </InputGroup>

      </Modal>
    );
  }
}

export default AddUrlParam;
