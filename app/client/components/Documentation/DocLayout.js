import React from 'react';
import styles from './DocLayout.css';
import GroupDoc from './GroupDoc';
import EndpointDoc from './EndpointDoc';

const DocLayout = ({ topLevel, doc, children, projectUrl, projectSlug, canEdit }) => {
  const renderBody = (type) => {
    switch (type) {
      case 'Endpoint':
        return <EndpointDoc {...{ topLevel, doc, projectUrl, projectSlug, canEdit }} />;

      default:
        return <GroupDoc {...{ topLevel, doc, projectUrl, projectSlug, canEdit }} />;
    }
  };

  return (
    <section className={styles.root} id={doc.section}>
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
  projectSlug: React.PropTypes.string,
  canEdit: React.PropTypes.bool,
};

export default DocLayout;
