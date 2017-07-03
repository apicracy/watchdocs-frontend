import React from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';

import NewDetailedProjectFrom from 'components/ProjectForm/NewDetailedProjectForm';
import { closeModal } from 'actions/modals';

import { createProject } from 'services/projects';

export const MODAL_NAME = 'AddProject';

@connect(state => ({
  isVisible: state.modals.opened === MODAL_NAME,
}))

class AddProjectModal extends React.Component {
  static propTypes = {
    isVisible: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
  };

  render() {
    const {
      isVisible,
    } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        title="Add project"
        onHide={this.onHide}
      >
        <NewDetailedProjectFrom
          initialValues={{ public: false }}
          onSubmit={this.onSave}
          onCancel={this.onHide}
        />
      </Modal>
    );
  }

  onSave = (values) => {
    const { dispatch } = this.props;
    return dispatch(createProject(values)).then(() => {
      this.onHide();
    });
  }

  onHide = () => {
    this.props.dispatch(closeModal(MODAL_NAME));
  }
}

export default AddProjectModal;
