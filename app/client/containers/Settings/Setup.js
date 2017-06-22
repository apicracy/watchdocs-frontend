import React from 'react';
import { connect } from 'react-redux';

import TabPanel from 'components/TabPanel/TabPanel';
import InputLink from 'components/Form/InputLink/InputLink';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';

import { openModal } from 'actions/modals';
import { MODAL_NAME as UPDATE_PROJECT_MODAL } from 'modals/EditProject/EditProject';

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

  render() {
    const {
      project,
    } = this.props;

    return (
      <div>
        <DocumentationBlock
          title="Application name"
        >
          <InputLink text={project.name} onClick={this.openProjectEditModal} placeholder="This project has not name yet" />
        </DocumentationBlock>
        <DocumentationBlock
          title="Base URL"
          description="This is the first part of an URL that we're going to use in documentation."
        >
          <InputLink text={project.base_url} onClick={this.openProjectEditModal} placeholder="http://api.example.com" />
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
