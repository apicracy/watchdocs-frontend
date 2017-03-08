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
  };

  componentWillMount() {
    this.setState({ type: 'Endpoint' });
  }

  render() {
    const {
      isShow,
      onSave,
      onHide,
    } = this.props;

    return (
      <Modal isShow={isShow} title="Add new" onSave={onSave} onHide={onHide}>
        <div>
          <div className={styles.modalField}>
            <text className={styles.modalLabel}>Type</text>
            <select
              defaultValue={this.state.type}
              className={styles.modalSelect}
              onChange={this.onChangeType}
            >
              <option>Endpoint</option>
              <option>Folder</option>
            </select>
          </div>
          { this.state.type === 'Endpoint' &&
            <Endpoint />
          }
          { this.state.type === 'Folder' &&
            <Folder />
          }
        </div>
      </Modal>
    );
  }

  onChangeType = (e) => {
    this.setState({ type: e.target.value });
  }
}

export default AddNewEndpointModal;
