import React from 'react';
import { Link } from 'react-router';
import styles from './DocLayout.css';
import DOMPurify from 'dompurify';
import Button from 'components/Button/Button';

const GroupDoc = ({ topLevel, doc, projectSlug }) => (
  <div className={styles.top} >
    <article className={styles.content}>
      <div className={topLevel ? styles.headerMain : styles.header}>
        <span className={styles.title}>
          { doc.name }
        </span>
        <div className={styles.editButton}>
          <Link to={`/${projectSlug}/editor/group/${doc.id}`}>
            <Button variants={['primary', 'rounded', 'medium']}>
              Edit
            </Button>
          </Link>
        </div>
      </div>
      <div
        className={styles.bodyContent}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(doc.description) }}
      />
    </article>
    <article className={styles.code} />
  </div>
);

GroupDoc.propTypes = {
  doc: React.PropTypes.object,
  topLevel: React.PropTypes.bool,
  projectSlug: React.PropTypes.string,
};

export default GroupDoc;
