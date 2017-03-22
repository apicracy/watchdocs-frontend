import React from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import FolderForm from 'components/FolderForm/FolderForm';
import EndpointForm from 'components/EndpointForm/EndpointForm';

import { closeModal } from 'actions/modals';

import {
  setParentFolder,
  setFolderName,
  setMethod,
  setUrl,
  saveEndpoint,
  cancel,
} from 'services/modifyEndpoint-service';

export const MODAL_NAME = 'EditEndpointModal';

@connect(state => ({
  isVisible: state.modals[MODAL_NAME],
  selectedParentFolder: state.modifyEndpoint.parentFolder,
  url: state.modifyEndpoint.url,
  folderName: state.modifyEndpoint.folderName,
  endpointType: state.modifyEndpoint.method,
  type: state.modifyEndpoint.type,
}))
class EditEndpointModal extends React.Component {
  static propTypes = {
    isVisible: React.PropTypes.bool,
    selectedParentFolder: React.PropTypes.string,
    url: React.PropTypes.string,
    folderName: React.PropTypes.string,
    endpointType: React.PropTypes.string,
    type: React.PropTypes.string,
    dispatch: React.PropTypes.func,
  };

  render() {
    const {
      isVisible,
      selectedParentFolder,
      url,
      folderName,
      endpointType,
      type,
    } = this.props;

    return (
      <Modal isVisible={isVisible} title="Edit..." saveButtonText="Save" onSave={this.onSave} onHide={this.onHide}>
        <div>
          { type === 'Endpoint' &&
            <EndpointForm
              selectedParentFolder={selectedParentFolder}
              inputValue={url}
              endpointType={endpointType}
              onSelectParentFolder={this.onSelectParentFolder}
              onChangeInput={this.onChangeUrl}
              onChangeEndpointType={this.onChangeEndpointType}
            />
          }
          { type === 'Folder' &&
            <FolderForm
              selectedParentFolder={selectedParentFolder}
              inputValue={folderName}
              onSelectParentFolder={this.onSelectParentFolder}
              onChangeInput={this.onChangeFolderName}
            />
          }
        </div>
      </Modal>
    );
  }

  onSave = () => {
    this.props.dispatch(saveEndpoint());
    this.props.dispatch(closeModal(MODAL_NAME));
  }

  onHide = () => {
    this.props.dispatch(cancel());
    this.props.dispatch(closeModal(MODAL_NAME));
  }

  onSelectParentFolder = (folderName) => {
    this.props.dispatch(setParentFolder(folderName));
  }

  onChangeUrl = (url) => {
    this.props.dispatch(setUrl(url));
  }

  onChangeFolderName = (url) => {
    this.props.dispatch(setFolderName(url));
  }

  onChangeEndpointType = (method) => {
    this.props.dispatch(setMethod(method));
  }
}

export default EditEndpointModal;
