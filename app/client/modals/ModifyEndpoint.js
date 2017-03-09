import React from 'react';
import { connect } from 'react-redux';
import AddNewModal from './AddNewModal/AddNewModal';
import {
  setParentFolder,
  setType,
  setMethod,
  setUrl,
  saveEndpoint,
  cancel,
} from 'services/modifyEndpoint-service';

@connect(state => ({
  isVisible: state.modifyEndpoint.isVisible,
  selectedParentFolder: state.modifyEndpoint.parentFolder,
  inputValue: state.modifyEndpoint.url,
  endpointType: state.modifyEndpoint.method,
  type: state.modifyEndpoint.type,
}))
export default class Modals extends React.Component {
  static propTypes = {
    isVisible: React.PropTypes.bool,
    selectedParentFolder: React.PropTypes.string,
    inputValue: React.PropTypes.string,
    endpointType: React.PropTypes.string,
    type: React.PropTypes.string,
    dispatch: React.PropTypes.func,
  };

  render() {
    const {
      isVisible,
      selectedParentFolder,
      inputValue,
      endpointType,
      type,
    } = this.props;

    return (
      <AddNewModal
        isShow={isVisible}
        onSave={this.onSave}
        onHide={this.onHide}

        selectedParentFolder={selectedParentFolder}
        inputValue={inputValue}
        endpointType={endpointType}
        type={type}

        onSelectParentFolder={this.onSelectParentFolder}
        onChangeInput={this.onChangeInput}
        onChangeEndpointType={this.onChangeEndpointType}
        onChangeType={this.onChangeType}
      />
    );
  }

  onSave = () => {
    this.props.dispatch(saveEndpoint());
  }

  onHide = () => {
    this.props.dispatch(cancel());
  }

  onSelectParentFolder = (folderName) => {
    this.props.dispatch(setParentFolder(folderName));
  }

  onChangeInput = (url) => {
    this.props.dispatch(setUrl(url));
  }

  onChangeEndpointType = (method) => {
    this.props.dispatch(setMethod(method));
  }

  onChangeType = (type) => {
    this.props.dispatch(setType(type));
  }
}
