import React from 'react';
import { connect } from 'react-redux';

import styles from './Settings.css';

import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';
import InputLink from 'components/Form/InputLink/InputLink';
import Icon from 'components/Icon/Icon';

import { openModal } from 'actions/modals';
import { MODAL_NAME as UPDATE_PROJECT_MODAL } from 'modals/EditProject/EditProject';
import { MODAL_NAME as UPDATE_PROJECT_VISIBILITY_MODAL } from 'modals/ProjectVisibilityModal/ProjectVisibilityModal';

import { removeProject } from 'services/projects';

@connect(store => ({
  project: store.projects.activeProject,
}))
class Delete extends React.Component {

  static propTypes = {
    project: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  openProjectEditModal = () => {
    this.props.dispatch(openModal(UPDATE_PROJECT_MODAL));
  }

  openProjectVisibilityModal = () => {
    this.props.dispatch(openModal(UPDATE_PROJECT_VISIBILITY_MODAL));
  }
  onRemoveProject = () => {
    const { project: { id }, dispatch } = this.props;

    // eslint-disable-next-line
    if (confirm('Are you sure you want to remove this project and its data? This action can not be undone.')) {
      dispatch(removeProject(id));
    }
  }

  render() {
    const {
      project,
    } = this.props;

    return (
      <div>
        <DocumentationBlock
          title="Application name"
        >
          <InputLink onClick={this.openProjectEditModal} placeholder="This project has not name yet">
            {project.name}
          </InputLink>
        </DocumentationBlock>
        <DocumentationBlock
          title="Base URL"
          description="This is the first part of an URL that we're going to use in documentation."
        >
          <InputLink onClick={this.openProjectEditModal} placeholder="http://api.example.com">
            {project.base_url}
          </InputLink>
        </DocumentationBlock>
        <DocumentationBlock
          title="Visibility"
          description="Seting your project to 'public' will enable access to our documentation for non-loged users."
        >
          <InputLink onClick={this.openProjectVisibilityModal}>
            { project.public && (
              <div>
                <Icon name="globe" /> Public documentation
              </div>
            )}
            { !project.public && (
              <div>
                <Icon name="lock" /> Private documentation
              </div>
            )}
          </InputLink>
        </DocumentationBlock>
        <DocumentationBlock
          title={`Delete "${project.name}" project`}
        >
          <p className={styles.text}><b>Warning</b> Deleting this project will cause all of
            its associated data to be deleted immediately.</p>
          <p className={styles.text}><b>This action can not be undone.</b></p>
          <button className={styles.deleteButton} onClick={this.onRemoveProject} >
            I understand -- Delete this project ({project.name}) and its data</button>
        </DocumentationBlock>
      </div>
    );
  }
}

export default Delete;
