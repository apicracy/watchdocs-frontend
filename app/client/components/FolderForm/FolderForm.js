import React from 'react';
import styles from './FolderForm.css';

class FolderForm extends React.Component {
  static propTypes = {
    selectedParentFolder: React.PropTypes.string,
    inputValue: React.PropTypes.string,
    onSelectParentFolder: React.PropTypes.func,
    onChangeInput: React.PropTypes.func,
  };

  static defaultProps = {
    onSelectParentFolder: () => {},
    onChangeInput: () => {},
  }

  render() {
    const {
      selectedParentFolder,
      inputValue,
    } = this.props;

    return (
      <div>
        <div className={styles.modalField}>
          <text className={styles.modalLabel}>Folder name</text>
          <div className={styles.modalInputWrapper}>
            <input value={inputValue} placeholder="Folder" className={styles.modalInput} onChange={this.onChangeInput} />
          </div>
        </div>
        <div className={styles.modalField}>
          <text className={styles.modalLabel}>Parent folder</text>
          <select
            defaultValue={selectedParentFolder}
            placeholder="No parent folder"
            className={styles.modalSelect}
            onChange={this.onSelectParentFolder}
          >
            <option value="" disabled hidden>No parent folder</option>
          </select>
        </div>
      </div>
    );
  }

  onChangeInput = (e) => {
    this.props.onChangeInput(e.target.value);
  }

  onSelectParentFolder = (e) => {
    this.props.onSelectParentFolder(e.target.value);
  }
}

export default FolderForm;
