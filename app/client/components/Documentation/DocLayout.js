import React from 'react';
import styles from './DocLayout.css';
import FolderDoc from './FolderDoc';
import EndpointDoc from './EndpointDoc';

const DocLayout = ({ topLevel, doc, children, projectUrl }) => {
  const renderBody = (type) => {
    switch (type) {
      case 'endpoint':
        return <EndpointDoc doc={doc} projectUrl={projectUrl} />;

      default:
        return <FolderDoc doc={doc} projectUrl={projectUrl} />;
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
      <div className={styles.fill}>
        <article className={styles.content} />
        <article className={styles.code} />
      </div>
    </section>
  );
};

DocLayout.propTypes = {
  topLevel: React.PropTypes.bool,
  doc: React.PropTypes.object,
  children: React.PropTypes.node,
  projectUrl: React.PropTypes.string,
};

export default DocLayout;
