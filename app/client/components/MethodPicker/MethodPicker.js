import React from 'react';
import styles from './MethodPicker.css';

import Select from 'components/Form/Select/Select';

const MethodPicker = ({ endpoint }) => {
  const options = [
    { id: 0, name: 'Select Method' },
    { id: 1, name: 'GET' },
    { id: 2, name: 'POST' },
    { id: 3, name: 'PATCH' },
    { id: 4, name: 'PUT' },
    { id: 5, name: 'DELETE' },
  ];

  const activeOption = options.find(x => x.name === endpoint.method.toUpperCase());

  return (
    <div className={styles.root}>
      <div className={styles.select}>
        <Select options={options} activeId={activeOption ? activeOption.id : 0} />
      </div>
      <div className={styles.path}>
        { endpoint.url }
      </div>
    </div>
  );
};

MethodPicker.propTypes = {
  endpoint: React.PropTypes.object,
};

export default MethodPicker;
