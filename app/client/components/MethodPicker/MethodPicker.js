import React from 'react';
import styles from './MethodPicker.css';

import Select from 'components/Select/Select';

const MethodPicker = () => (
  <div className={styles.root}>
    <div className={styles.select}>
      <Select options={['GET', 'POST']} />
    </div>
    <div className={styles.path}>
      {'/users'}
    </div>
  </div>
);

export default MethodPicker;
