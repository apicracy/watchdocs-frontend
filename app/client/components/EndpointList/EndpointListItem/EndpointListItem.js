import React from 'react';
import { Link } from 'react-router';
import CustomIcon from 'components/Icon/CustomIcon';

import styles from './EndpointListItem.css';

const formatParams = (params) => {
  if (params && params.length > 0) {
    const formatted = params.map(param => `:${param}`);

    return `/(${formatted.join(', ')})`;
  }

  return '';
};

const EndpointListItem = ({ path, method, params, id, groupId, isSelected, onClickMore }) => {
  const topStyle = isSelected ? styles.selected : styles.root;
  const paramsFormated = formatParams(params);

  return (
    <div className={topStyle}>
      <Link to={`/docs/${groupId}/endpoint/${id}`} className={styles.root}>
        <span className={styles.data}>
          <span className={styles.method}>{ method }</span>
          <span className={styles.path}>{ path }{ paramsFormated }</span>
        </span>
      </Link>
      { isSelected && <button onClick={() => { onClickMore(id); }} className={styles.moreIcon}><CustomIcon name="more-dots" /></button> }
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
  onClickMore: React.PropTypes.func,
};

export default EndpointListItem;
