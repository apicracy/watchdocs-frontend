import React from 'react';
import styles from './LoadingIndicator.css';

const LoadingIndicator = ({ fixed }) => (
  <div className={fixed ? styles.fixed : styles.root}>
    <i className="fa fa-spin fa-spinner fa-4x fa-pulse" />
  </div>
);

LoadingIndicator.propTypes = {
  fixed: React.PropTypes.bood,
};

export default LoadingIndicator;
