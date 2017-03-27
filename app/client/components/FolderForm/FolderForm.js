import React from 'react';
import styles from './FolderForm.css';

class FolderForm extends React.Component {
  static propTypes = {
    inputValue: React.PropTypes.string,
    onChangeInput: React.PropTypes.func,
  };

  static defaultProps = {
    onSelectParentFolder: () => {},
    onChangeInput: () => {},
  }

  render() {
    const {
      inputValue,
    } = this.props;

    return (
      <div>
        <div className={styles.modalField}>
          <text className={styles.modalLabel}>Folder name</text>
          <text className={styles.modalSmallLabel}>
            This name will be displayed as a label for whole section and all endpoints that are going to live under this folder
          </text>
          <div className={styles.modalInputWrapper}>
            <input value={inputValue} placeholder="Folder" className={styles.modalInput} onChange={this.onChangeInput} />
          </div>
        </div>
      </div>
    );
  }

  onChangeInput = (e) => {
    this.props.onChangeInput(e.target.value);
  }
}

export default FolderForm;
