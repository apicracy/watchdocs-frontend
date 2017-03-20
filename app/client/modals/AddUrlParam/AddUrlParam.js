import React from 'react';
import { connect } from 'react-redux';
import styles from './AddNewModal.css';
import Modal from 'components/Modal/Modal';

import { closeModal } from 'actions/modals';

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

  onSave = () => this.props.dispatch(closeModal(MODAL_NAME));

  onHide = () => this.props.dispatch(closeModal(MODAL_NAME));

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
        Hello World!
      </Modal>
    );
  }
}

export default AddUrlParam;
