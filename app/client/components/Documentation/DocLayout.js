import React from 'react';
import styles from './DocLayout.css';
import FolderDoc from './FolderDoc';

const DocLayout = ({ topLevel, doc, children }) => {

  return (
    <section className={styles.root} id={doc.section}>
      <div className={styles.top} >
        <article className={styles.content}>
          <div className={topLevel ? styles.headerMain : styles.header }>{ doc.title }</div>
          { (doc.type === 'endpoint') && <div className={styles.addHeader}>{ doc.description }</div> }
        </article>
        <article className={styles.code}></article>
      </div>
      <FolderDoc doc={doc} />

      { children }
    </section>
  );
}

export default DocLayout;
