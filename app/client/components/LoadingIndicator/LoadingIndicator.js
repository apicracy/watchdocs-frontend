import React from 'react';
import styles from './LoadingIndicator.css';

const LoadingIndicator = () => (
  <div className={styles.root}>
    <i className="fa fa-spin fa-spinner fa-4x fa-pulse" />
  </div>
);

export default LoadingIndicator;
