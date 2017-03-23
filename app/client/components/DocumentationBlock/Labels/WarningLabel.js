import React from 'react';
import CustomIcon from 'components/Icon/CustomIcon';
import styles from './WarningLabel.css';

const WarningLabel = () => (
  <span className={styles.root}>
    <CustomIcon name="warning-circle" /> Doc missing!
  </span>
);

export default WarningLabel;
