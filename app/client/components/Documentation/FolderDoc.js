import React from 'react';
import styles from './DocLayout.css';

const FolderDoc = ({ doc }) => {
  return (
    <div className={styles.top} >
      <article className={styles.content}>
        <p>{ doc.description }</p>
      </article>
      <article className={styles.code}>
        {` `}
      </article>
    </div>
  );
}

export default FolderDoc;
