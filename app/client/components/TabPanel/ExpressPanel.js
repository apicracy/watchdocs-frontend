import React from 'react';
import styles from './TabPanel.css';

class JavascriptPanel extends React.Component {
  render() {
    return (
      <div>
        <h2 className={styles.title}>Express.js installation</h2>
        <br />
        <div className={styles.step}>
          <p className={styles.instruction}>
            <strong>Comming soon</strong> in beta version.
          </p>
        </div>
      </div>
    );
  }
}

export default JavascriptPanel;
