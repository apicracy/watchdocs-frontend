import React from 'react';
import styles from './DocLayout.css';

const FolderDoc = ({ doc }) => (
  <div className={styles.top} >
    <article className={styles.content}>
      <div className={styles.bodyContent}>
        { doc.description }
      </div>
    </article>
    <article className={styles.code}>
      {' '}
    </article>
  </div>
);

FolderDoc.propTypes = {
  doc: React.PropTypes.object,
};

export default FolderDoc;
