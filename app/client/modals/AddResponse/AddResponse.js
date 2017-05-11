import React from 'react';
import { connect } from 'react-redux';

import Modal from 'components/Modal/Modal';
import ResponseForm from 'components/ResponseForm/ResponseForm';

import { addResponse } from 'services/endpointView';
import { closeModal } from 'actions/modals';

export const MODAL_NAME = 'addResponse';

@connect(store => ({
  isVisible: !!store.modals[MODAL_NAME],
}))

class addResponseModal extends React.Component {
  static propTypes = {
    isVisible: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
  }

  onSave = values => (
    this.props.dispatch(addResponse({
      endpoint_id: this.props.params.endpoint_id,
      http_status_code: values.http_status_code,
    })).then(() => {
      this.props.dispatch(closeModal(MODAL_NAME));
    })
  )

  onHide = () => {
    this.props.dispatch(closeModal(MODAL_NAME));
  }

  render() {
    return (
      <Modal isVisible={this.props.isVisible} title="Add new response" onHide={this.onHide}>
        <ResponseForm onCancel={this.onHide} onSubmit={this.onSave} />
      </Modal>
    );
  }
}

export default addResponseModal;
