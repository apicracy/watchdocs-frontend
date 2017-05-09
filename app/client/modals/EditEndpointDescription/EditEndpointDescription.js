import React from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import InputGroup from 'components/Form/InputGroup/InputGroup';
import TextInput from 'components/Form/TextInput/TextInput';
import TextArea from 'components/Form/TextArea/TextArea';
import Button from 'components/Button/Button';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';

import { closeModal } from 'actions/modals';
import { updateEndpointDescription as save } from 'actions/endpointView';

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
        onHide={this.onHide}
      >
        <form onSubmit={this.onSave}>
          <InputGroup title="Title" description="Describe in few words what this action will do.">
            <TextInput
              value={this.state.title}
              placeholder="Title"
              onChange={this.onFieldChange('title')}
              name="title"
            />
          </InputGroup>

          <InputGroup title="Summary" description="Give user more context info to what he can use this action.">
            <TextArea
              rows={5}
              value={this.state.content}
              placeholder="Endpoint description"
              onChange={this.onFieldChange('content')}
              name="content"
            />
          </InputGroup>
          <ButtonGroup>
            <Button type="submit" variants={['primary', 'large']} >Update</Button>
            <Button
              type="button"
              variants={['large', 'lightBorder', 'spaceLeft']}
              onClick={this.onHide}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
    );
  }
}

export default EditEndpointDescription;
