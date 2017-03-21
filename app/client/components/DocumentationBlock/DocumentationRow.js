import React from 'react';
import styles from './DocumentationRow.css';

import Button from 'components/Button/Button';
import CustomIcon from 'components/Icon/CustomIcon';

const DocumentationRow = ({ empty, data, actions }) => {
  return (
    <article className={empty ? styles.empty : styles.root}>
      <div className={styles.data}>
        {
          data.map((v, k) => (
            <span key={k}>{v}</span>
          ))
        }
      </div>
      <div className={styles.actions}>
        {
          actions.map((v, k) => (
            <span key={k}>{v}</span>
          ))
        }
      </div>
    </article>
  );
};

export default DocumentationRow;
