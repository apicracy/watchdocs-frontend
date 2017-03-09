import React from 'react';
import styles from './AddNewModal.css';

class Endpoint extends React.Component {
  static propTypes = {
    selectedParentFolder: React.PropTypes.string,
    inputValue: React.PropTypes.string,
    endpointType: React.PropTypes.string,

    onSelectParentFolder: React.PropTypes.func,
    onChangeInput: React.PropTypes.func,
    onChangeEndpointType: React.PropTypes.func,
  };

  static defaultProps = {
    selectedParentFolder: '',
    endpointType: 'GET',
  }

  render() {
    const {
      selectedParentFolder,
      inputValue,
      endpointType,
      onSelectParentFolder,
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
            <select
              value={endpointType}
              className={styles.modalEndpointSelect}
              onChange={onChangeEndpointType}
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </select>
            <input value={inputValue} placeholder="URL endpoint" className={styles.modalInput} onChange={onChangeInput} />
          </div>
        </div>
        <div className={styles.modalField}>
          <text className={styles.modalLabel}>Parent folder</text>
          <select
            value={selectedParentFolder}
            className={styles.modalSelect}
            onChange={onSelectParentFolder}
          >
            <option value="" disabled hidden>No parent folder</option>
            <option >lder</option>
            <option >Nopar</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Endpoint;
