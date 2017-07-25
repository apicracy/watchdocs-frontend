import React from 'react';
import styles from './TabPanel.css';
import CopyableCodeBlock from '../CopyableCodeBlock/CopyableCodeBlock';

class JavascriptPanel extends React.Component {
  static propTypes = {
    project: React.PropTypes.object,
  };

  render() {
    const { project } = this.props;

    const code = `const watchdocs = require('watchdocs-express')

app.use(watchdocs({
  appId: '${project.app_id}',
  appSecret: '${project.app_secret}'
}))`;

    return (
      <div>
        <h2 className={styles.title}>Installation</h2>
        <br />

        <div className={styles.step}>
          <p className={styles.instruction}>
            Express.js middleware can be installed from npm.
          </p>
          <CopyableCodeBlock textToCopy="npm install watchdocs-express --save">
            <span>
              npm install watchdocs-express --save
            </span>
          </CopyableCodeBlock>
        </div>

        <div className={styles.step}>
          <p className={styles.instruction}>
            In index.js add following code below express app
            instanization but above all routing middlewares:
          </p>
          <CopyableCodeBlock textToCopy={code}>
            <pre className={styles.pre}>
              {code}
            </pre>
          </CopyableCodeBlock>
        </div>

        <div className={styles.step}>
          <p className={styles.instruction}><a target="_blank" rel="noopener noreferrer" href="https://www.npmjs.com/package/watchdocs-express" className={styles.fadeOutLink}>For more information and help please see package readme.</a></p>
        </div>
      </div>
    );
  }
}

export default JavascriptPanel;
