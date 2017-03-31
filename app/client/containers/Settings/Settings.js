import React from 'react';
import styles from './Settings.css';

import Chart from 'components/Chart/Chart';
import RemoveApp from 'components/RemoveApp/RemoveApp';
import TextInput from 'components/Form/TextInput/TextInput';


import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';

class Settings extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
  }

  render() {
    const {
      params,
    } = this.props;

    return (
      <div className={styles.root}>
        <aside className={styles.aside}>
          <div className={styles.menu}>
            <p className={styles.active}>Application setup</p>
            <p>User access</p>
            <p>Security schemas</p>
          </div>
        </aside>
        <div className={styles.container}>
          <DocumentationBlock
            title="Name"
            description="This is the name for application that we're going to display."
          >
            <TextInput value={params.project_name} />
          </DocumentationBlock>
          <div className={styles.row}>
            <div className={styles.column}>
              <DocumentationBlock
                title="APP-Key"
                description="Lorem ipsum dolor sit amet."
              >
                <TextInput value="7f7sdfshjf43743fbhj" />
              </DocumentationBlock>
            </div>
            <div className={styles.column}>
              <DocumentationBlock
                title="APP-ID"
                description="Lorem ipsum dolor sit amet."
              >
                <TextInput value="shadow-of-forest-5534" />
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
        </div>
      </div>
    );
  }
}

export default Settings;
