import React from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import EndpointForm from 'components/EndpointForm/EndpointForm';

import { closeModal } from 'actions/modals';

import {
  setMethod,
  setUrl,
  editEndpoint,
  cancel,
} from 'services/modifyEndpoint-service';

export const MODAL_NAME = 'EditEndpoint';

@connect(state => ({
  isVisible: state.modals.opened === MODAL_NAME,
  isEdit: state.modifyEndpoint.isEdit,
  endpointType: state.modifyEndpoint.method,
}))
class EditModal extends React.Component {
  static propTypes = {
    isVisible: React.PropTypes.bool,
    endpointType: React.PropTypes.string,
    dispatch: React.PropTypes.func,
  };

  render() {
    const {
      isVisible,
      endpointType,
    } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        title="Edit endpoint"
        onHide={this.onHide}
      >
        <div>
          <EndpointForm
            endpointType={endpointType}
            onChangeInput={this.onChangeInput}
            onChangeEndpointType={this.onChangeEndpointType}
            onSubmit={this.onSave}
            onCancel={this.onHide}
            saveButtonText="Update"
          />
        </div>
      </Modal>
    );
  }

  onSave = () => (
    this.props
       .dispatch(editEndpoint())
       .then(() => (this.props.dispatch(closeModal(MODAL_NAME))))
  );

  onHide = () => {
    this.props.dispatch(closeModal(MODAL_NAME));
    this.props.dispatch(cancel());
  }

  onChangeInput = (url) => {
    this.props.dispatch(setUrl(url));
  }

  onChangeEndpointType = (method) => {
    this.props.dispatch(setMethod(method));
  }
}

export default EditModal;
