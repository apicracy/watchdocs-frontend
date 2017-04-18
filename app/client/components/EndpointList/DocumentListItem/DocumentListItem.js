import React from 'react';
import Link from 'components/NavigationLink/LinkWrapper';

import styles from './DocumentListItem.css';

const DocumentListItem = ({ url, id, isSelected }) => {
  const topStyle = isSelected ? styles.selected : styles.root;

  return (
    <div className={topStyle}>
      <Link to={`/editor/document/${id}`} className={styles.root}>
        <span className={styles.data}>
          <span className={styles.method}>DOC</span>
          <span className={styles.path}>{ url }</span>
        </span>
      </Link>
    </div>
  );
};

DocumentListItem.propTypes = {
  url: React.PropTypes.string,
  id: React.PropTypes.number,
  isSelected: React.PropTypes.bool,
};

export default DocumentListItem;
