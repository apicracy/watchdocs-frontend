import React from 'react';
import { connect } from 'react-redux';

import styles from './Settings.css';

import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';

@connect(store => ({
  projectName: store.projects.activeProject.name,
}))
class Delete extends React.Component {

  static propTypes = {
    projectName: React.PropTypes.string, // supplied by react-router
  }

  render() {
    const {
      projectName,
    } = this.props;

    return (
      <div>
        <DocumentationBlock
          title={`Delete "${projectName}" project`}
        >
          <p className={styles.text}><b>Warning</b> Deleting this project will cause all of
            its associated data to be deleted immediately.</p>
          <p className={styles.text}><b>This action can not be undone.</b></p>
          <button className={styles.deleteButton}>
            I understand -- Delete this project ({projectName}) and its data</button>
        </DocumentationBlock>
      </div>
    );
  }
}

export default Delete;
