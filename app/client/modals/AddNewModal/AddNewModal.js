import React from 'react';
import styles from './AddNewModal.css';
import Modal from 'components/Modal/Modal';
import Folder from './Folder';
import Endpoint from './Endpoint';

class AddNewEndpointModal extends React.Component {
  static propTypes = {
    isShow: React.PropTypes.bool,
    onSave: React.PropTypes.func,
    onHide: React.PropTypes.func,

    selectedParentFolder: React.PropTypes.string,
    inputValue: React.PropTypes.string,
    endpointType: React.PropTypes.string,
    type: React.PropTypes.string,

    onSelectParentFolder: React.PropTypes.func,
    onChangeInput: React.PropTypes.func,
    onChangeEndpointType: React.PropTypes.func,
    onChangeType: React.PropTypes.func,
  };

  render() {
    const {
      isShow,
      onSave,
      onHide,
      selectedParentFolder,
      inputValue,
      endpointType,
      type,
    } = this.props;

    return (
      <Modal isShow={isShow} title="Add new" onSave={onSave} onHide={onHide}>
        <div>
          <div className={styles.modalField}>
            <text className={styles.modalLabel}>Type</text>
            <select
              value={type}
              className={styles.modalSelect}
              onChange={this.onChangeType}
            >
              <option>Endpoint</option>
              <option>Folder</option>
            </select>
          </div>
          { type === 'Endpoint' &&
            <Endpoint
              selectedParentFolder={selectedParentFolder}
              inputValue={inputValue}
              endpointType={endpointType}
              onSelectParentFolder={this.onSelectParentFolder}
              onChangeInput={this.onChangeInput}
              onChangeEndpointType={this.onChangeEndpointType}
            />
          }
          { type === 'Folder' &&
            <Folder />
          }
        </div>
      </Modal>
    );
  }

  onChangeType = (e) => {
    this.props.onChangeType(e.target.value);
  }

  onSelectParentFolder = (e) => {
    this.props.onSelectParentFolder(e.target.value);
  }
  onChangeInput = (e) => {
    this.props.onChangeInput(e.target.value);
  }
  onChangeEndpointType = (e) => {
    this.props.onChangeEndpointType(e.target.value);
  }
}

export default AddNewEndpointModal;
