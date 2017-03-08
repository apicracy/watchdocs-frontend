import React from 'react';
import styles from './AddNewModal.css';

class Endpoint extends React.Component {
  static propTypes = {
    onSelectFolder: React.PropTypes.func,
    onChangeInput: React.PropTypes.func,
    onChangeEndpointType: React.PropTypes.func,
  };

  render() {
    const {
      onSelectFolder,
      onChangeInput,
      onChangeEndpointType,
    } = this.props;

    return (
      <div>
        <div className={styles.modalField}>
          <text className={styles.modalLabel}>Endpoint</text>
          <text className={styles.modalSmallLabel}>
            Format query params to &quot;id&quot; notation (for example /user/:id)
          </text>
          <div className={styles.modalInputWrapper}>
            <select className={styles.modalEndpointSelect} onChange={onChangeEndpointType}>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </select>
            <input placeholder="URL endpoint" className={styles.modalInput} onChange={onChangeInput} />
          </div>
        </div>
        <div className={styles.modalField}>
          <text className={styles.modalLabel}>Parent folder</text>
          <select defaultValue="" className={styles.modalSelect} onChange={onSelectFolder}>
            <option value="" disabled hidden>No parent folder</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Endpoint;
