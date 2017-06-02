import React from 'react';
import styles from './TabPanel.css';

class PhpPanel extends React.Component {
  render() {
    return (
      <div>
        <h2 className={styles.title}>Symfony 2 installation</h2>
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

export default PhpPanel;
