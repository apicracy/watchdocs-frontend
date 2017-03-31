import React from 'react';
import styles from './Settings.css';

import Chart from 'components/Chart/Chart';
import RemoveApp from 'components/RemoveApp/RemoveApp';
import Button from 'components/Button/Button';


import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';

class Settings extends React.Component {

  static defaultProps = {
    projectName: 'This is a project Name',
  }

  static propTypes = {
    // params: React.PropTypes.object, // supplied by react-router
    // dispatch: React.PropTypes.func,
    projectName: React.PropTypes.string,
  }

  render() {
    const {
      projectName,
    } = this.props;

    return (
      <div className={styles.root}>
        <DocumentationBlock
          title="Name"
          description="This is the name for application that we're going to display."
        >
          <div>{projectName}</div>
        </DocumentationBlock>
        <div className={styles.row}>
          <div className={styles.column}>
            <DocumentationBlock
              title="APP-Key"
              description="Lorem ipsum dolor sit amet."
            >
              <div>{projectName}</div>
            </DocumentationBlock>
          </div>
          <div className={styles.column}>
            <DocumentationBlock
              title="APP-ID"
              description="Lorem ipsum dolor sit amet."
            >
              <div>{projectName}</div>
            </DocumentationBlock>
          </div>
        </div>
        <DocumentationBlock
          title="Collected data"
          description="We're currently tracking request from your application."
        >
          <Chart />
        </DocumentationBlock>

        <RemoveApp onClick={() => {}} />

        <div className={styles.buttons}>
          <Button variants={['primary', 'large', 'spaceRight']}>Save</Button>
          <Button variants={['body', 'large']}>Preview</Button>
        </div>

      </div>
    );
  }
}

export default Settings;
