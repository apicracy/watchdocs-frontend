import React from 'react';
import styles from './DocLayout.css';
import FolderDoc from './FolderDoc';
import EndpointDoc from './EndpointDoc';

const DocLayout = ({ topLevel, doc, children }) => {
  const renderBody = (type) => {
    switch (type) {
      case 'endpoint':
        return <EndpointDoc doc={doc} />;

      default:
        return <FolderDoc doc={doc} />;
    }
  };

  return (
    <section className={styles.root} id={doc.section}>
      <div className={styles.top} >
        <article className={styles.content}>
          <div className={topLevel ? styles.headerMain : styles.header}>{ doc.title }</div>
          { (doc.type === 'endpoint') && <div className={styles.addHeader}>{ doc.description }</div> }
        </article>
        <article className={styles.code} />
      </div>
      { renderBody(doc.type) }

      { children }
    </section>
  );
};

DocLayout.propTypes = {
  topLevel: React.PropTypes.bool,
  doc: React.PropTypes.object,
  children: React.PropTypes.node,
};

export default DocLayout;
