import React from 'react';
import CustomIcon from 'components/Icon/CustomIcon';
import styles from './WarningLabel.css';

const WarningLabel = ({ message }) => (
  <span className={styles.root}>
    <CustomIcon name="warning-circle" /> { message }
  </span>
);

WarningLabel.propTypes = {
  message: React.PropTypes.string,
};

export default WarningLabel;
