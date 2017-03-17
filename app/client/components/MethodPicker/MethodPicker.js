import React from 'react';
import styles from './MethodPicker.css';

import Select from 'components/Select/Select';

const formatParams = (params) => {
  if (params && params.length > 0) {
    const formatted = params.map(param => `:${param}`);

    return `/(${formatted.join(', ')})`;
  }

  return '';
};

const MethodPicker = ({ activeId, path, groupEndpoints }) => {
  const currentEndpoint = groupEndpoints.filter(v => v.id === activeId);
  const options = currentEndpoint.map(v => ({
    ...v,
    active: true,
    name: v.method,
  }));

  return (
    <div className={styles.root}>
      <div className={styles.select}>
        <Select options={options} />
      </div>
      <div className={styles.path}>
        { path }{ formatParams(currentEndpoint[0] ? currentEndpoint[0].params : [])}
      </div>
    </div>
  );
};

MethodPicker.propTypes = {
  activeId: React.PropTypes.number,
  path: React.PropTypes.string,
  groupEndpoints: React.PropTypes.array,
};

MethodPicker.defaultProps = {
  activeId: 0,
  path: '',
  groupEndpoints: [],
};

export default MethodPicker;
