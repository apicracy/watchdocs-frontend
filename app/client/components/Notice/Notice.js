import React from 'react';
import styles from './Notice.css';

const Notice = ({ icon, message, type }) => (
  <div className={[styles.root, styles[type]].join(' ')}>
    <i className={`fa fa-${icon} ${styles.icon}`} />
    <div className={styles.message}>{ message }</div>
  </div>
);

Notice.propTypes = {
  icon: React.PropTypes.string,
  message: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
  type: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
};

Notice.defaultProps = {
  icon: 'exclamation-triangle',
  type: 'info',
};

export default Notice;
