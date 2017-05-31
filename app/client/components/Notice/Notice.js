import React from 'react';
import styles from './Notice.css';

const Notice = ({ icon, message }) => (
  <div className={styles.root}>
    <i className={`fa fa-${icon} ${styles.icon}`} />
    <div className={styles.message}>{ message }</div>
  </div>
);

Notice.propTypes = {
  icon: React.PropTypes.string,
  message: React.PropTypes.string,
};

export default Notice;
