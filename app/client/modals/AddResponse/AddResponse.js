import React from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import Select from 'components/Form/Select/Select';
import InputGroup from 'components/Form/InputGroup/InputGroup';
import styles from './AddResponse.css';
import { addResponse } from 'services/endpointView';

import { closeModal } from 'actions/modals';

export const MODAL_NAME = 'addResponse';

@connect(store => ({
  isVisible: !!store.modals[MODAL_NAME],
}))
class addResponseModal extends React.Component {

  static propTypes = {
    isVisible: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
  }

  componentWillMount() {
    this.reset();
    this.paramTypes = [
      { id: 200, name: '200 - OK' },
      { id: 201, name: '201 - Created' },
      { id: 204, name: '204 - No Content' },
      { id: 304, name: '304 - Not Modified' },
      { id: 400, name: '400 - Bad Request' },
      { id: 401, name: '401 - Unauthorized' },
      { id: 403, name: '403 - Forbidden' },
      { id: 404, name: '404 - Not Found' },
      { id: 409, name: '409 - Conflict' },
      { id: 422, name: '422 - Unauthorized' },
      { id: 500, name: '500 - Internal Server Error' },
    ];
  }

  reset = () => this.setState({ responseStatus: null });

  onSave = () => {
    this.props.dispatch(addResponse({
      endpoint_id: this.props.params.endpoint_id,
      http_status_code: this.getSelectedId(this.state.responseStatus),
    }));
    this.props.dispatch(closeModal(MODAL_NAME));
    this.reset();
  }

  onHide = () => {
    this.props.dispatch(closeModal(MODAL_NAME));
    this.reset();
  }

  onTypeChange = id => this.setState({ responseStatus: this.getSelectedValue(id) });

  getSelectedId = (value) => {
    const record = this.paramTypes.find(p => p.name === value);
    return record ? record.id : null;
  }

  getSelectedValue = (id) => {
    const record = this.paramTypes.find(p => p.id === id);
    return record ? record.name : null;
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        title="Add new response"
        onSave={this.onSave}
        onHide={this.onHide}
        saveButtonText="Save"
        cancelButtonText="Cancel"
        message={null}
      >
        <InputGroup title="Response status" description="Give user more information about data type of param">
          <div className={styles.selectWrapper}>
            <Select
              variants={['fullWidth', 'bordered']}
              options={this.paramTypes}
              activeId={this.getSelectedId(this.state.responseStatus)}
              onSelect={this.onTypeChange}
            />
          </div>
        </InputGroup>
      </Modal>
    );
  }
}

export default addResponseModal;
