import React from 'react';
import styles from './MethodPicker.css';

import Select from 'components/Form/Select/Select';

const formatParams = (params) => {
  if (params && params.length > 0) {
    const formatted = params.reduce((state, param) => {
      if (param.main) {
        return [`/:${param.name}`, ...state];
      }

      const divider = state.length < 2 ? '?' : '&';

      return [...state, divider, `${param.name}`];
    }, []);

    return formatted.join('');
  }

  return '';
};

const MethodPicker = ({ activeId, path, groupEndpoints }) => {
  const currentEndpoint = groupEndpoints.find(v => v.id === activeId);
  const options = currentEndpoint ? [{ ...currentEndpoint, name: currentEndpoint.method }] : [];

  return (
    <div className={styles.root}>
      <div className={styles.select}>
        <Select options={options} activeId={currentEndpoint ? currentEndpoint.id : 0} />
      </div>
      <div className={styles.path}>
        { path }{ formatParams(currentEndpoint ? currentEndpoint.params : [])}
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
