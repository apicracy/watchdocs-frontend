import React from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import FolderForm from 'components/FolderForm/FolderForm';
import EndpointForm from 'components/EndpointForm/EndpointForm';
import DocumentForm from 'components/DocumentForm/DocumentForm';

import { closeModal } from 'actions/modals';

import {
  setParentFolder,
  setFolderName,
  setMethod,
  setUrl,
  saveEndpoint,
  cancel,
  setType,
  setDocumentName,
} from 'services/modifyEndpoint-service';

export const MODAL_NAME = 'AddNewEndpoint';

@connect(state => ({
  isVisible: state.modals[MODAL_NAME],
  selectedParentFolder: state.modifyEndpoint.parentFolder,
  url: state.modifyEndpoint.url,
  folderName: state.modifyEndpoint.folderName,
  endpointType: state.modifyEndpoint.method,
  documentName: state.modifyEndpoint.documentName,
  type: state.modifyEndpoint.type,
}))
class AddNewModal extends React.Component {
  static propTypes = {
    isVisible: React.PropTypes.bool,
    selectedParentFolder: React.PropTypes.string,
    url: React.PropTypes.string,
    folderName: React.PropTypes.string,
    documentName: React.PropTypes.string,
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
      documentName,
    } = this.props;

    const validUrl = new RegExp(/^\/{1}(:?[A-Za-z0-9\-_\.~]+\/)*(:?[A-Za-z0-9\-_\.~]+)$/ig);

    let title;

    switch (type) {
      case 'Endpoint' : title = 'Add endpoint'; break;
      case 'Folder' : title = 'Add folder'; break;
      case 'Document' : title = 'Add document'; break;
      default: break;
    }

    return (
      <Modal isVisible={isVisible} isValid={validUrl.test(this.props.url)} title={title} onSave={this.onSave} onHide={this.onHide}>
        <div>
          { type === 'Endpoint' &&
            <EndpointForm
              validUrl={validUrl}
              selectedParentFolder={selectedParentFolder}
              inputValue={url}
              endpointType={endpointType}
              onSelectParentFolder={this.onSelectParentFolder}
              onChangeInput={this.onChangeInput}
              onChangeEndpointType={this.onChangeEndpointType}
            />
          }
          { type === 'Folder' &&
            <FolderForm
              inputValue={folderName}
              onChangeInput={this.onChangeFolderName}
            />
          }
          { type === 'Document' &&
            <DocumentForm
              inputValue={documentName}
              onChangeInput={this.onChangeDocumentName}
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
    this.props.dispatch(closeModal(MODAL_NAME));
    this.props.dispatch(cancel());
  }

  onSelectParentFolder = (folderName) => {
    this.props.dispatch(setParentFolder(folderName));
  }

  onChangeInput = (url) => {
    this.props.dispatch(setUrl(url));
  }

  onChangeFolderName = (url) => {
    this.props.dispatch(setFolderName(url));
  }
  onChangeDocumentName = (title) => {
    this.props.dispatch(setDocumentName(title));
  }

  onChangeEndpointType = (method) => {
    this.props.dispatch(setMethod(method));
  }

  onChangeType = (e) => {
    this.props.dispatch(setType(e.target.value));
  }
}

export default AddNewModal;
