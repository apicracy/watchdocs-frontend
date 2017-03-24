import React from 'react';
import styles from './MethodPicker.css';

import Select from 'components/Form/Select/Select';

const MethodPicker = ({ activeId, path, groupEndpoints }) => {
  const currentEndpoint = groupEndpoints.find(v => v.id === activeId);
  const options = currentEndpoint ? [{ ...currentEndpoint, name: currentEndpoint.method }] : [];
  const mainParam = currentEndpoint ? currentEndpoint.params.find(p => p.main) : false;

  return (
    <div className={styles.root}>
      <div className={styles.select}>
        <Select options={options} activeId={currentEndpoint ? currentEndpoint.id : 0} />
      </div>
      <div className={styles.path}>
        { path }{ mainParam ? `/:${mainParam.name}` : '' }
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
