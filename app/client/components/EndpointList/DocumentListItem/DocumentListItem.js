import React from 'react';
import Link from 'components/NavigationLink/LinkWrapper';

import styles from './DocumentListItem.css';

const DocumentListItem = ({ name, id, isSelected }) => {
  const topStyle = isSelected ? styles.selected : styles.root;

  return (
    <div className={topStyle}>
      <Link to={`/editor/document/${id}`} className={styles.root}>
        <span className={styles.data}>
          <span className={styles.method}>DOC</span>
          <span className={styles.path}>{ name }</span>
        </span>
      </Link>
    </div>
  );
};

DocumentListItem.propTypes = {
  id: React.PropTypes.number,
  isSelected: React.PropTypes.bool,
  name: React.PropTypes.string,
};

export default DocumentListItem;
