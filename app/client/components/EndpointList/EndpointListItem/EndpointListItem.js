import React from 'react';
import { Link } from 'react-router';
import Icon from 'components/Icon/CustomIcon';

import styles from './EndpointListItem.css';

const formatParams = (params) => {
  if (params && params.length > 0) {
    const formatted = params.map(param => `:${param}`);

    return `/(${formatted.join(', ')})`;
  }

  return '';
};

const EndpointListItem = ({ path, method, params, id, groupId, isSelected }) => {
  const topStyle = isSelected ? styles.selected : styles.root;
  const paramsFormated = formatParams(params);

  return (
    <Link to={`/docs/${groupId}/endpoint/${id}`} className={topStyle}>
      <span className={styles.data}>
        <span className={styles.method}>{ method }</span>
        <span className={styles.path}>{ path }{ paramsFormated }</span>
      </span>
      { isSelected && <span className={styles.moreIcon}><Icon name="dots" /></span> }
    </Link>
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
