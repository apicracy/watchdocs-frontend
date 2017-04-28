import React from 'react';
import styles from './DocLayout.css';

const parseDescription = (desc) => {
  if (!desc) return '';

  return desc.split('\n')
    .map((paragraph, key) => (
      <p key={key}>{paragraph}</p>
    ));
};

const FolderDoc = ({ topLevel, doc }) => (
  <div className={styles.top} >
    <article className={styles.content}>
      <div className={topLevel ? styles.headerMain : styles.header}>{ doc.name }</div>
      <div className={styles.bodyContent}>
        {
          doc.description ? parseDescription(doc.description) : doc.text
        }
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
