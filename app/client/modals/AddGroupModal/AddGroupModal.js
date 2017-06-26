import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import Modal from 'components/Modal/Modal';
import GroupForm from 'components/GroupForm/GroupForm';

import { closeModal } from 'actions/modals';

import {
  createGroup,
} from 'services/groups';

export const MODAL_NAME = 'AddNewGroup';

@connect(state => ({
  isVisible: state.modals.opened === MODAL_NAME,
  activeProjectId: state.projects.activeProject.id,
}))
class AddGroupModal extends React.Component {
  static propTypes = {
    isVisible: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
    activeProjectId: React.PropTypes.number,
  };

  render() {
    const {
      isVisible,
    } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        title="Add Group"
        onHide={this.onHide}
      >
        <div>
          <GroupForm
            onSubmit={this.onSave}
            onCancel={this.onHide}
          />
        </div>
      </Modal>
    );
  }

  onSave = values => (
    this.props.dispatch(createGroup({
      project_id: this.props.activeProjectId,
      name: values.name,
    })).then(() => (
      this.onHide()
    ))
  );

  onHide = () => {
    this.props.dispatch(closeModal(MODAL_NAME));
    this.props.dispatch(reset('groupForm'));
  }
}

export default AddGroupModal;
