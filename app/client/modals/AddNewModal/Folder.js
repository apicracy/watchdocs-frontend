import React from 'react';
import styles from './AddNewModal.css';

class AddNewEndpointModal extends React.Component {
  static propTypes = {
    onSelectFolder: React.PropTypes.func,
    onChangeInput: React.PropTypes.func,
  };

  render() {
    const {
      onSelectFolder,
      onChangeInput,
    } = this.props;

    return (
      <div>
        <div className={styles.modalField}>
          <text className={styles.modalLabel}>Folder name</text>
          <div className={styles.modalInputWrapper}>
            <input placeholder="Folder" className={styles.modalInput} onChange={onChangeInput} />
          </div>
        </div>
        <div className={styles.modalField}>
          <text className={styles.modalLabel}>Parent folder</text>
          <select
            defaultValue=""
            placeholder="No parent folder"
            className={styles.modalSelect}
            onChange={onSelectFolder}
          >
            <option value="" disabled hidden>No parent folder</option>
          </select>
        </div>
      </div>
    );
  }
}

export default AddNewEndpointModal;
