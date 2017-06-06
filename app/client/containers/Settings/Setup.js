import React from 'react';
import { connect } from 'react-redux';

import TabPanel from 'components/TabPanel/TabPanel';
import TextInput from 'components/Form/TextInput/TextInput';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';

@connect(store => ({
  project: store.projects.activeProject,
}))
class Setup extends React.Component {

  static propTypes = {
    project: React.PropTypes.object
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
          <TextInput variant="white" defaultValue={project.name} />
        </DocumentationBlock>
        <DocumentationBlock
          title="Base URL"
          description="This is the first part of an URL that we're going to use in documentation."
        >
          <TextInput defaultValue={project.base_url} />
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
