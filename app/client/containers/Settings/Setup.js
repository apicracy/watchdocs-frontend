import React from 'react';
import { connect } from 'react-redux';

import TabPanel from 'components/TabPanel/TabPanel';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';
import UpdateProjectNameForm from 'components/ProjectForm/UpdateProjectNameForm';
import UpdateProjectBaseUrlForm from 'components/ProjectForm/UpdateProjectBaseUrlForm';

import { updateProject } from 'services/projects';

@connect(store => ({
  project: store.projects.activeProject,
}))
class Setup extends React.Component {

  static propTypes = {
    project: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  onSave = (values) => {
    const { dispatch, project } = this.props;
    return dispatch(updateProject(project.id, {
      name: values.name,
      base_url: values.base_url,
    }));
  }

  render() {
    const {
      project,
    } = this.props;

    return (
      <div>
        <DocumentationBlock title="Application name">
          <UpdateProjectNameForm initialValues={{ name: project.name }} onSubmit={this.onSave} />
        </DocumentationBlock>
        <DocumentationBlock
          title="Base URL"
          description="This is the first part of an URL that we're going to use in documentation."
        >
          <UpdateProjectBaseUrlForm
            initialValues={{ base_url: project.base_url }}
            onSubmit={this.onSave}
          />
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
