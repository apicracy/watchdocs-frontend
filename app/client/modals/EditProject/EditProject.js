import React from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import UpdateProjectForm from 'components/ProjectForm/UpdateProjectForm';

import { closeModal } from 'actions/modals';

import { updateProject } from 'services/projects';

export const MODAL_NAME = 'EditProject';

@connect(state => ({
  isVisible: state.modals[MODAL_NAME],
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
        title="Edit project"
        onHide={this.onHide}
      >
        { project && (
          <UpdateProjectForm
            initialValues={{ name: project.name, base_url: project.base_url }}
            onSubmit={this.onSave}
            onCancel={this.onHide}
          />
        )}
      </Modal>
    );
  }

  onSave = (values) => {
    const { dispatch, project } = this.props;
    return dispatch(updateProject(project.id, {
      name: values.name,
      base_url: values.base_url,
    })).then(() => {
      this.props.dispatch(closeModal(MODAL_NAME));
    });
  }

  onHide = () => {
    this.props.dispatch(closeModal(MODAL_NAME));
  }
}

export default EditModal;
