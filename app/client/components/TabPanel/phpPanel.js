import React from 'react';
import styles from './TabPanel.css';

class PhpPanel extends React.Component {
  render() {
    return (
      <div>
        <h2 className={styles.title}>PHP installation</h2>
        <br />
        <div className={styles.step}>
          <p className={styles.instruction}>We are working on it.</p>
        </div>
      </div>
    );
  }
}

export default PhpPanel;
