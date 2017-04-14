import React from 'react';
import { connect } from 'react-redux';

import styles from './Settings.css';

import TabPanel from 'components/TabPanel/TabPanel';
import TextInput from 'components/Form/TextInput/TextInput';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';

@connect(store => ({
  projectUrl: store.projects.activeProject.base_url,
}))
class Setup extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    projectUrl: React.PropTypes.string, // supplied by react-router
  }

  render() {
    const {
      params,
      projectUrl,
    } = this.props;

    return (
      <div className={styles.container}>
        <DocumentationBlock
          title="Application name"
        >
          <TextInput defaultValue={params.project_name} />
        </DocumentationBlock>
        <DocumentationBlock
          title="Base URL"
          description="This is the first part of an URL that we're going to use in documentation."
        >
          <TextInput defaultValue={projectUrl} />
        </DocumentationBlock>
        <DocumentationBlock
          title="Installation"
        >
          <TabPanel />
        </DocumentationBlock>
      </div>
    );
  }
}

export default Setup;
