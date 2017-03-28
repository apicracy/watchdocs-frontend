import React from 'react';
import { Link } from 'react-router';

import styles from './EndpointListItem.css';

const formatParams = (params) => {
  if (params && params.length > 0) {
    const formatted = params.filter(p => p.main).map(param => `:${param.name}`);

    return `/(${formatted.join(', ')})`;
  }

  return '';
};

const EndpointListItem = ({ path, method, params, id, groupId, isSelected }) => {
  const topStyle = isSelected ? styles.selected : styles.root;
  const paramsFormated = formatParams(params);

  return (
    <div className={topStyle}>
      <Link to={`/editor/${groupId}/endpoint/${id}`} className={styles.root}>
        <span className={styles.data}>
          <span className={styles.method}>{ method }</span>
          <span className={styles.path}>{ path }{ paramsFormated }</span>
        </span>
      </Link>
    </div>
  );
};

EndpointListItem.propTypes = {
  path: React.PropTypes.string,
  method: React.PropTypes.string,
  params: React.PropTypes.array,
  id: React.PropTypes.number,
  groupId: React.PropTypes.number,
  isSelected: React.PropTypes.bool,
};

export default EndpointListItem;
