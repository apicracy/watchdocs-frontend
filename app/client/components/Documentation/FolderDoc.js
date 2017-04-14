import React from 'react';
import styles from './DocLayout.css';

const FolderDoc = ({ topLevel, doc }) => (
  <div className={styles.top} >
    <article className={styles.content}>
      <div className={topLevel ? styles.headerMain : styles.header}>{ doc.title }</div>
      <div className={styles.bodyContent}>
        {doc.description.split('\n').map((paragraph, key) => (
          <p key={key}>{paragraph}</p>
        ))}
      </div>
    </article>
    <article className={styles.code} />
  </div>
);

FolderDoc.propTypes = {
  doc: React.PropTypes.object,
  topLevel: React.PropTypes.bool,
};

export default FolderDoc;
