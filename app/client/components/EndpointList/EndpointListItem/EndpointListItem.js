import React from 'react';
import Link from 'components/NavigationLink/LinkWrapper';

import styles from './EndpointListItem.css';

const EndpointListItem = ({ url, method, id, groupId, isSelected }) => {
  const topStyle = isSelected ? styles.selected : styles.root;

  return (
    <div className={topStyle}>
      <Link to={`/editor/${groupId}/endpoint/${id}`} className={styles.root}>
        <span className={styles.data}>
          <span className={styles.method}>{ method }</span>
          <span className={styles.path}>{ url }</span>
        </span>
      </Link>
    </div>
  );
};

EndpointListItem.propTypes = {
  url: React.PropTypes.string,
  method: React.PropTypes.string,
  id: React.PropTypes.number,
  groupId: React.PropTypes.number,
  isSelected: React.PropTypes.bool,
};

export default EndpointListItem;
