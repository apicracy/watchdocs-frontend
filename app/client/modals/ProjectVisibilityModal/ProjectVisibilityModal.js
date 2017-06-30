import React from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import UpdateProjectVisibilityForm from 'components/ProjectForm/UpdateProjectVisibilityForm';

import { closeModal } from 'actions/modals';

import { updateProject } from 'services/projects';

export const MODAL_NAME = 'ProjectVisibility';

@connect(state => ({
  isVisible: state.modals.opened === MODAL_NAME,
  project: state.projects.activeProject,
}))

class EditModal extends React.Component {
  static propTypes = {
    isVisible: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
    project: React.PropTypes.object,
  };

  render() {
    const {
      isVisible,
      project,
    } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        title="Visibility"
        onHide={this.onHide}
      >
        <UpdateProjectVisibilityForm
          initialValues={{ public: project.public }}
          onSubmit={this.onSave}
          onCancel={this.onHide}
        />
      </Modal>
    );
  }

  onSave = (values) => {
    const { dispatch, project } = this.props;
    return dispatch(updateProject(project.id, {
      public: values.public,
    })).then(() => {
      this.props.dispatch(closeModal(MODAL_NAME));
    });
  }

  onHide = () => {
    this.props.dispatch(closeModal(MODAL_NAME));
  }
}

export default EditModal;
