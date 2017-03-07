import React from 'react';
import styles from './AddNewEndpointModal.css';
import Modal from 'components/Modal/Modal';

class AddNewEndpointModal extends React.Component {
  static propTypes = {
    isShow: React.PropTypes.bool,
    onSave: React.PropTypes.func,
    onHide: React.PropTypes.func,
  };

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
            <select className={styles.modalSelect} />
          </div>
          <div className={styles.modalField}>
            <text className={styles.modalLabel}>Endpoint</text>
            <text className={styles.modalSmallLabel}>
              Format query params to &quot;id&quot; notation (for example /user/:id)
            </text>
            <select className={styles.modalEndpointSelect}>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </select>
            <input className={styles.modalInput} />
          </div>
          <div className={styles.modalField}>
            <text className={styles.modalLabel}>Parent folder</text>
            <select className={styles.modalSelect} />
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddNewEndpointModal;
