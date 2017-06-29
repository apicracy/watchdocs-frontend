import React from 'react';
import { connect } from 'react-redux';

import TabPanel from 'components/TabPanel/TabPanel';
import InputLink from 'components/Form/InputLink/InputLink';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';
import Icon from 'components/Icon/Icon';

import { openModal } from 'actions/modals';
import { MODAL_NAME as UPDATE_PROJECT_MODAL } from 'modals/EditProject/EditProject';
import { MODAL_NAME as UPDATE_PROJECT_VISIBILITY_MODAL } from 'modals/ProjectVisibilityModal/ProjectVisibilityModal';

@connect(store => ({
  project: store.projects.activeProject,
}))
class Setup extends React.Component {

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
                <Icon name="globe" /> Public project
              </div>
            )}
            { !project.public && (
              <div>
                <Icon name="lock" /> Private project
              </div>
            )}
          </InputLink>
        </DocumentationBlock>
        <DocumentationBlock
          title="Installation"
        >
          <TabPanel project={project} />
        </DocumentationBlock>
      </div>
    );
  }
}

export default Setup;
