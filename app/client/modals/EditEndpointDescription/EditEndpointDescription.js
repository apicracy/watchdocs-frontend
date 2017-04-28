import React from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import InputGroup from 'components/Form/InputGroup/InputGroup';
import TextInput from 'components/Form/TextInput/TextInput';
import TextArea from 'components/Form/TextArea/TextArea';

import { closeModal } from 'actions/modals';
import { updateEndpointDescription as save } from 'services/endpointView';

export const MODAL_NAME = 'EditEndpointDescription';

/* eslint react/no-unused-prop-types: 0 */
@connect(store => ({
  isVisible: !!store.modals[MODAL_NAME],
  endpoint: store.endpointView,
}))
class EditEndpointDescription extends React.Component {
  static propTypes ={
    endpoint: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    isVisible: React.PropTypes.bool,
  }

  componentWillMount() {
    this.reset();
  }

  reset = () => this.setState({ title: '', content: '' });

  componentWillReceiveProps(nextProps) {
    const { description } = nextProps.endpoint;

    if (description) {
      this.setState({ ...description });
    } else {
      this.reset();
    }
  }

  onSave = () => {
    this.props.dispatch(closeModal(MODAL_NAME));
    this.props.dispatch(save({ ...this.state }));
  }

  onHide = () => {
    this.props.dispatch(closeModal(MODAL_NAME));
    this.reset();
  }

  onFieldChange = fieldName => ({ nativeEvent }) => (
    this.setState({ [fieldName]: nativeEvent.target.value })
  );

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        title="Endpoint description"
        onSave={this.onSave}
        onHide={this.onHide}
        saveButtonText="Save"
        cancelButtonText="Cancel"
      >

        <InputGroup title="Title" description="Describe in few words what this action will do.">
          <TextInput
            value={this.state.title}
            placeholder="Title"
            onChange={this.onFieldChange('title')}
          />
        </InputGroup>

        <InputGroup title="Summary" description="Give user more context info to what he can use this action.">
          <TextArea
            rows={5}
            value={this.state.content}
            placeholder="Endpoint description"
            onChange={this.onFieldChange('content')}
          />
        </InputGroup>

      </Modal>
    );
  }
}

export default EditEndpointDescription;
