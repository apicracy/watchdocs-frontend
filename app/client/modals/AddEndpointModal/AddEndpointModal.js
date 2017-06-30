import React from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import EndpointForm from 'components/EndpointForm/EndpointForm';

import { closeModal } from 'actions/modals';

import {
  setMethod,
  setUrl,
  saveEndpoint,
  cancel,
  setType,
} from 'services/modifyEndpoint-service';

export const MODAL_NAME = 'AddNewEndpoint';

@connect(state => ({
  isVisible: state.modals.opened === MODAL_NAME,
  endpointType: state.modifyEndpoint.method,
}))
class AddEndpointModal extends React.Component {
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
        title="Add endpoint"
        onHide={this.onHide}
      >
        <div>
          <EndpointForm
            endpointType={endpointType}
            onChangeInput={this.onChangeInput}
            onChangeEndpointType={this.onChangeEndpointType}
            onSubmit={this.onSave}
            onCancel={this.onHide}
          />
        </div>
      </Modal>
    );
  }

  onSave = () => (
    this.props
       .dispatch(saveEndpoint())
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

  onChangeType = (e) => {
    this.props.dispatch(setType(e.target.value));
  }
}

export default AddEndpointModal;
